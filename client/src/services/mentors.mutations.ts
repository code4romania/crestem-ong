import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMentorshipRequest } from "./api/create-mentorship-request.api";
import { deleteMentorshipRelation } from "./api/delete-mentorship-relation.api";
import { listMentorshipRelationsQueryOptions } from "./mentors.queries";

export function useCreateMentorshipRequestMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMentorshipRequest,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: listMentorshipRelationsQueryOptions().queryKey,
      });
    },
  });
}

export function useDeleteMentorshipRelationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMentorshipRelation,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: listMentorshipRelationsQueryOptions().queryKey,
      });
    },
  });
}
