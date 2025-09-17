import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMentor } from "./api/create-mentor.api";

export function useCreateMentorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMentor,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["mentors"] });
    },
  });
}
