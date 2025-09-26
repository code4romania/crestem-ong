import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  upsertEvaluation,
  type UpsertEvaluationRequest,
} from "./api/upsert-evaluation.api";
import { inviteNGOMemberToEvaluation } from "./api/invite-ngo-member-to-evaluation.api";
import { deleteEvaluation } from "./api/delete-evaluation.api";

export function updateEvaluationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpsertEvaluationRequest) => upsertEvaluation(request),
    onSuccess: async (evaluation) => {
      await queryClient.invalidateQueries({ queryKey: ["evaluations"] });
    },
  });
}

export function useInviteNGOMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inviteNGOMemberToEvaluation,
    onSuccess: async (evaluation) => {
      await queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}

export function useDeleteEvaluationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvaluation,
    onSuccess: async (evaluation) => {
      await queryClient.invalidateQueries({
        queryKey: ["evaluations"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },
  });
}
