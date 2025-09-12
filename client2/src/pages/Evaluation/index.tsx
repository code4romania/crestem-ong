import Button from "@/components/Button";
import EvaluationFinished from "@/components/EvaluationFinished";
import FullScreenLoader from "@/components/FullScreenLoader";
import Pagination from "@/components/Pagination";
import Section from "@/components/Section";
import StartEvaluation from "@/components/StartEvaluation";
import type {
  EvaluationDimension,
  UpsertEvaluationDimensionRequest,
} from "@/redux/api/types";
import {
  useGetEvaluationQuery,
  userApi,
  useSubmitEvaluationMutation,
} from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Navigate, useParams, useSearchParams } from "@tanstack/react-router";
import { z } from "zod";
import { EvaluationStep } from "./EvaluationStep";
import ExpiredEvaluation from "./ExpiredEvaluation";

const invalid_type_error = "Vă rugăm alegeți o opțiune";
const min_message = "Acest câmp este obligatoriu";

const answerSchema = z.enum(["0", "1", "2", "3", "4"]);

const dimensionSchema = z.object({
  question_1: answerSchema,
  question_2: answerSchema,
  question_3: answerSchema,
  question_4: answerSchema,
  question_5: answerSchema,
  comment: z.string().min(1, { message: min_message }).max(1000),
});

export type DimensionType = z.infer<typeof dimensionSchema>;

const evaluationSchema = z.object({
  dimensions: z.array(dimensionSchema),
});

const evaluationSchema_old = z.object({
  question_1: z.string().min(1, { error: invalid_type_error }),
  question_2: z.string().min(1, { error: invalid_type_error }),
  question_3: z.string().min(1, { error: invalid_type_error }),
  question_4: z.string().min(1, { error: invalid_type_error }),
  question_5: z.string().min(1, { error: invalid_type_error }),
  comment: z.string().min(1, { message: min_message }).max(1000),
});

export type EvaluationForm = z.infer<typeof evaluationSchema>;

export type EvaluationInput = z.infer<typeof evaluationSchema_old> & {
  evaluationId: string;
  dimensionIndex: string;
};

const mapToEvaluationDimension = (
  data: DimensionType
): UpsertEvaluationDimensionRequest => ({
  quiz: [
    {
      answer: +data.question_1,
    },
    {
      answer: +data.question_2,
    },
    {
      answer: +data.question_3,
    },
    {
      answer: +data.question_4,
    },
    {
      answer: +data.question_5,
    },
  ],
  comment: data.comment,
});

const mergeEvaluations = (
  serverEvaluation: EvaluationDimension[],
  localEvaluation: UpsertEvaluationDimensionRequest[]
): UpsertEvaluationDimensionRequest[] => {
  const mergedList: UpsertEvaluationDimensionRequest[] = [...serverEvaluation]; // Start with original data

  localEvaluation.forEach((userItem, index) => {
    if (index < mergedList.length) {
      // If index exists, merge the data
      mergedList[index] = {
        ...mergedList[index],
        ...userItem,
      };
    } else {
      // If index is beyond original list, append new element
      mergedList.push(userItem);
    }
  });

  return mergedList;
};

const Evaluation = () => {
  const user = useAppSelector((state) => state.userState.user);

  const { evaluationId } = useParams();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email");

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const methods = useForm<EvaluationForm>({
    resolver: zodResolver(evaluationSchema),
    shouldFocusError: true,
  });

  const {
    formState: { errors },
    handleSubmit,
    trigger,
    setValue,
    getValues,
    watch,
  } = methods;

  const userFilledInDimensions = watch("dimensions", []);

  const { data: matrixData, isLoading: isMatrixLoading } =
    userApi.endpoints.getMatrix.useQuery(undefined, {
      skip: false,
      refetchOnMountOrArgChange: true,
    });

  const {
    isLoading: isEvaluationLoading,
    data: evaluationData,
    error: evaluationError,
  } = useGetEvaluationQuery({
    evaluationId: evaluationId ?? "",
    email: emailParam ?? "",
  });

  const [
    submitEvaluation,
    { isLoading: isSubmitLoading, isSuccess: isSubmitSuccess },
  ] = useSubmitEvaluationMutation();

  const isFDSC = user?.role?.type === "fdsc";

  useEffect(() => {
    const userAnswers = evaluationData?.dimensions?.map((dimension) => {
      const mappedQuestionAnswers = dimension.quiz.reduce(
        (acc, curr, index) => {
          acc[`question_${index + 1}` as keyof DimensionType] =
            curr.answer.toString() as "0" | "1" | "2" | "3" | "4";

          return acc;
        },
        {} as DimensionType
      );

      return {
        ...mappedQuestionAnswers,
        comment: dimension.comment ?? "",
      };
    });

    setValue("dimensions", userAnswers ?? []);
  }, [evaluationData, setValue]);

  function incrementStep() {
    if (currentStepIndex < matrixData?.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  }

  const handleNext = async () => {
    // Trigger validation for the current step
    const isStepValid = await trigger(`dimensions.${currentStepIndex}`);

    // If step is invalid, find the first error and scroll to it
    if (!isStepValid) {
      const firstErrorField = Object.keys(
        errors.dimensions?.[currentStepIndex] || {}
      )[0];

      if (firstErrorField) {
        const errorElement = formRef.current?.querySelector(
          `[name="dimensions.${currentStepIndex}.${firstErrorField}"]`
        );

        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
          // @ts-ignore
          errorElement.focus();
        }
      }
      return; // Stop execution if validation fails
    }

    const isFormValid = await trigger(`dimensions`);
    // submit to server only if whole form is valid
    if (isFormValid) {
      await onSubmit(getValues());
    } else {
      incrementStep();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: EvaluationForm) => {
    const evaluation = mergeEvaluations(
      evaluationData?.dimensions ?? [],
      data.dimensions.map(mapToEvaluationDimension)
    );

    submitEvaluation({
      evaluationId: evaluationId ?? "",
      dimensions: evaluation,
    });

    incrementStep();
  };

  const handleClickStart = useCallback(() => {
    setHasStarted(true);
    window.scrollTo(0, 0);
  }, []);

  const validFilledInDimensions = useMemo(() => {
    const validCount = userFilledInDimensions.filter(
      (dimension) => dimensionSchema.safeParse(dimension).success
    ).length;

    return validCount;
  }, [userFilledInDimensions]);

  if (isMatrixLoading || isEvaluationLoading) {
    return <FullScreenLoader />;
  }
  if ((evaluationError as any)?.status === 403) {
    return <Navigate to="/" />;
  }

  if (isFDSC && evaluationData?.dimensions?.length === 10) {
    return <EvaluationResults evaluationData={evaluationData} />;
  }

  if ((evaluationError as any)?.status === 401) {
    return <ExpiredEvaluation error={evaluationError} />;
  }

  if (!hasStarted && evaluationData?.dimensions?.length === 0) {
    return <StartEvaluation onClick={handleClickStart} />;
  }

  if (
    evaluationData?.dimensions?.length &&
    matrixData?.length &&
    evaluationData?.dimensions?.length === matrixData?.length
  ) {
    return <EvaluationFinished />;
  }

  if (!matrixData) {
    return <Navigate to="/" />;
  }

  if (methods.formState.isSubmitting) {
    return <FullScreenLoader />;
  }

  if (isSubmitLoading) {
    return <FullScreenLoader />;
  }

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-card rounded-lg p-6 shadow-md"
      >
        {matrixData?.length ? (
          <Section>
            <EvaluationStep
              dimension={matrixData[currentStepIndex]}
              stepIndex={currentStepIndex}
              totalSteps={matrixData.length}
            />

            <Section>
              <Pagination step={validFilledInDimensions} />
            </Section>
            <Section>
              <div className="flex place-content-end gap-3">
                <Button
                  type="button"
                  color="white"
                  onClick={handleBack}
                  disabled={
                    currentStepIndex === 0 || methods.formState.isSubmitting
                  }
                >
                  Back
                </Button>
                <Button type="button" onClick={handleNext} color="teal">
                  {currentStepIndex !== 9
                    ? methods.formState.isSubmitting
                      ? "Se trimite..."
                      : "Continuă"
                    : "Trimite"}
                </Button>
              </div>
            </Section>
          </Section>
        ) : (
          <div className="text-center py-8">
            <p>No form data available. Please try again later.</p>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default Evaluation;
