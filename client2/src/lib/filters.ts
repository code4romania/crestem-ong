import type { FinalEvaluationModel } from "@/services/api/types";

export const evaluationsCompletedFilter = (
  evaluations: FinalEvaluationModel[]
): FinalEvaluationModel[] =>
  evaluations.filter(
    (evaluation) =>
      evaluation.dimensions.reduce(
        (acc, dimension) => acc + dimension.quiz.length,
        0
      ) === 50
  );
