import type { EvaluationModel } from "@/services/api/get-program.api";

export const evaluationsCompletedFilter = (
  evaluations: EvaluationModel[]
): EvaluationModel[] =>
  evaluations.filter(
    (evaluation) =>
      evaluation.attributes.dimensions.reduce(
        (acc, dimension) => acc + dimension.quiz.length,
        0
      ) === 50
  );
