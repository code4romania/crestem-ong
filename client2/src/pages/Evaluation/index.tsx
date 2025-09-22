import EvaluationFinished from "@/components/EvaluationFinished";
import EvaluationResults from "@/components/EvaluationResults";
import FullScreenLoader from "@/components/FullScreenLoader";
import Pagination from "@/components/Pagination";
import Section from "@/components/Section";
import StartEvaluation from "@/components/StartEvaluation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/redux/store";
import { Route } from "@/routes/(app)/evaluation/$evaluationId";
import type { FinalEvaluationDimensionModel } from "@/services/api/types";
import type { UpsertEvaluationDimensionRequest } from "@/services/api/upsert-evaluation.api";
import { updateEvaluationMutation } from "@/services/evaluation.mutations";
import { useSuspenseGetEvaluation } from "@/services/evaluation.queries";
import { useSuspenseGetMatrix } from "@/services/matrix.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { EvaluationStep } from "./EvaluationStep";
import { toast } from "sonner";

// const evaluationSchema_old = z.object({
//   question_1: z.string().min(1, { error: invalid_type_error }),
//   question_2: z.string().min(1, { error: invalid_type_error }),
//   question_3: z.string().min(1, { error: invalid_type_error }),
//   question_4: z.string().min(1, { error: invalid_type_error }),
//   question_5: z.string().min(1, { error: invalid_type_error }),
//   comment: z.string().min(1, { message: min_message }).max(1000),
// });

// export type EvaluationInput = z.infer<typeof evaluationSchema_old> & {
//   evaluationId: string;
//   dimensionIndex: string;
// };

const mapToEvaluationDimension = (
  data: DimensionEvaluationForm
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
  serverEvaluation: FinalEvaluationDimensionModel[],
  stepIndex: number,
  localEvaluation: DimensionEvaluationForm
): UpsertEvaluationDimensionRequest[] => {
  const mergedList: UpsertEvaluationDimensionRequest[] = [...serverEvaluation];

  mergedList[stepIndex] = mapToEvaluationDimension(localEvaluation);

  return mergedList;
};

const invalid_type_error = "Vă rugăm alegeți o opțiune";
const min_message = "Acest câmp este obligatoriu";

const answerSchema = z.enum(["0", "1", "2", "3", "4"], {
  error: invalid_type_error,
});
export type AnswerType = z.infer<typeof answerSchema>;

const dimensionEvaluationSchema = z.object({
  question_1: answerSchema,
  question_2: answerSchema,
  question_3: answerSchema,
  question_4: answerSchema,
  question_5: answerSchema,
  comment: z.string().min(1, { message: min_message }).max(1000),
});

export type DimensionEvaluationForm = z.infer<typeof dimensionEvaluationSchema>;

const Evaluation = () => {
  const user = useAppSelector((state) => state.userState.user);

  const { evaluationId } = Route.useParams();
  const { email } = Route.useSearch();
  const { data: evaluationData } = useSuspenseGetEvaluation(
    evaluationId,
    email
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(
    evaluationData.dimensions?.length ?? 0
  );
  const [hasStarted, setHasStarted] = useState(false);

  const form = useForm<DimensionEvaluationForm>({
    resolver: zodResolver(dimensionEvaluationSchema),
    defaultValues: {
      comment: evaluationData.dimensions?.[currentStepIndex]?.comment ?? "",
      question_1: evaluationData.dimensions?.[
        currentStepIndex
      ]?.quiz?.[0]?.answer?.toString() as AnswerType,
      question_2: evaluationData.dimensions?.[
        currentStepIndex
      ]?.quiz?.[1]?.answer?.toString() as AnswerType,
      question_3: evaluationData.dimensions?.[
        currentStepIndex
      ]?.quiz?.[2]?.answer?.toString() as AnswerType,
      question_4: evaluationData.dimensions?.[
        currentStepIndex
      ]?.quiz?.[3]?.answer?.toString() as AnswerType,
      question_5: evaluationData.dimensions?.[
        currentStepIndex
      ]?.quiz?.[4]?.answer?.toString() as AnswerType,
    },
  });

  const { data: dimensions } = useSuspenseGetMatrix((d) => d.dimensions);

  const { mutate: updateEvaluation, isPending } = updateEvaluationMutation();

  const isFDSC = user?.role?.type === "fdsc";

  function incrementStep() {
    if (currentStepIndex < dimensions?.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: DimensionEvaluationForm) => {
    const evaluation = mergeEvaluations(
      evaluationData?.dimensions ?? [],
      currentStepIndex,
      data
    );
    updateEvaluation(
      {
        evaluationId: evaluationId ?? "",
        dimensions: evaluation,
      },
      {
        onSuccess: () => {
          incrementStep();
          form.reset();
        },
        onError: () =>
          toast.error("A aparut o problema la trimiterea raspunsurilor"),
      }
    );
  };

  const handleClickStart = useCallback(() => {
    setHasStarted(true);
    window.scrollTo(0, 0);
  }, []);

  if (isFDSC && evaluationData?.dimensions?.length === 10) {
    return <EvaluationResults evaluationData={evaluationData} />;
  }

  if (!hasStarted && evaluationData?.dimensions?.length === 0) {
    return <StartEvaluation onClick={handleClickStart} />;
  }

  if (
    evaluationData?.dimensions?.length &&
    dimensions?.length &&
    evaluationData?.dimensions?.length === dimensions?.length
  ) {
    return <EvaluationFinished />;
  }

  if (!dimensions) {
    return <Navigate to="/" />;
  }

  if (form.formState.isSubmitting) {
    return <FullScreenLoader />;
  }

  if (isPending) {
    return <FullScreenLoader />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Section>
          <EvaluationStep
            dimension={dimensions[currentStepIndex]}
            stepIndex={currentStepIndex}
            totalSteps={dimensions.length}
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
                disabled={currentStepIndex === 0 || isPending}
              >
                Back
              </Button>
              <Button type="submit">
                {currentStepIndex !== 9
                  ? isPending
                    ? "Se trimite..."
                    : "Continuă"
                  : "Trimite"}
              </Button>
            </div>
          </Section>
        </Section>
      </form>
    </Form>
  );
};

export default Evaluation;
