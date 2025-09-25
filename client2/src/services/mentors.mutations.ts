import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMentorshipRequest } from "./api/create-mentorship-Request.api";

export function useCreateMentorshipRequestMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMentorshipRequest,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["mentors"] });
    },
  });
}
