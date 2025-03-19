import Button from "@/components/Button";
import EvaluationFinished from "@/components/EvaluationFinished";
import EvaluationResults from "@/components/EvaluationResults";
import FullScreenLoader from "@/components/FullScreenLoader";
import Pagination from "@/components/Pagination";
import Section from "@/components/Section";
import StartEvaluation from "@/components/StartEvaluation";
import {
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
import { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { array, enum as enum_, object, string, TypeOf } from "zod";
import { EvaluationStep } from "./EvaluationStep";
import ExpiredEvaluation from "./ExpiredEvaluation";

const invalid_type_error = "Vă rugăm alegeți o opțiune";
const min_message = "Acest câmp este obligatoriu";

const answerSchema = enum_(["0", "1", "2", "3", "4"], {
  required_error: invalid_type_error,
  invalid_type_error: invalid_type_error,
});

const dimensionSchema = object({
  question_1: answerSchema,
  question_2: answerSchema,
  question_3: answerSchema,
  question_4: answerSchema,
  question_5: answerSchema,
  comment: string({
    required_error: min_message,
    invalid_type_error: min_message,
  })
    .min(1, { message: min_message })
    .max(1000),
});

export type DimensionType = TypeOf<typeof dimensionSchema>;

const evaluationSchema = object({
  dimensions: array(dimensionSchema),
});

const evaluationSchema_old = object({
  question_1: string({ invalid_type_error }),
  question_2: string({ invalid_type_error }),
  question_3: string({ invalid_type_error }),
  question_4: string({ invalid_type_error }),
  question_5: string({ invalid_type_error }),
  comment: string().min(1, { message: min_message }).max(1000),
});

export type EvaluationForm = TypeOf<typeof evaluationSchema>;

export type EvaluationInput = TypeOf<typeof evaluationSchema_old> & {
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
    defaultValues: {
      dimensions: [
        {
          comment: "",
        },
      ],
    },
  });

  const {
    control,
    formState: { errors, isSubmitSuccessful },
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
        comment: dimension.comment,
      };
    });

    setValue("dimensions", userAnswers ?? []);
    setCurrentStepIndex(evaluationData?.dimensions?.length ?? 0);
  }, [evaluationData, setValue]);

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

    await onSubmit(getValues());
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

    // Move to the next step if validation passes
    if (currentStepIndex < matrixData?.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleClickStart = useCallback(() => {
    setHasStarted(true);
    window.scrollTo(0, 0);
  }, []);

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

  if (!hasStarted && evaluationData?.dimensions?.length) {
    return <StartEvaluation onClick={handleClickStart} />;
  }

  if (
    userFilledInDimensions.length &&
    matrixData?.length &&
    userFilledInDimensions.length === matrixData?.length
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
            />

            <Section>
              <Pagination step={currentStepIndex} />
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
