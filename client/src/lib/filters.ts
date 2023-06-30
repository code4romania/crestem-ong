import { Evaluation } from "@/redux/api/types";

export const evaluationsCompletedFilter = (evaluations: Evaluation[]) =>
  evaluations.filter(
    (evaluation) =>
      evaluation.dimensions.reduce(
        (acc, dimension) => acc + dimension.quiz.length,
        0
      ) === 50
  );
