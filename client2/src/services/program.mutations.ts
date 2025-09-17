import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProgram } from "./api/update-program.api";

export function useUpdateProgramMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProgram,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}
