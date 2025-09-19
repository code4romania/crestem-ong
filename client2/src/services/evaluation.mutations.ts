import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  upsertEvaluation,
  type UpsertEvaluationRequest,
} from "./api/upsert-evaluation.api";

export function updateEvaluationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpsertEvaluationRequest) => upsertEvaluation(request),
    onSuccess: async (evaluation) => {
      console.log(evaluation);
      await queryClient.invalidateQueries({ queryKey: ["evaluations"] });
    },
  });
}
