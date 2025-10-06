import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProgram } from "./api/update-program.api";
import { createProgram } from "./api/create-program.api";

export function useUpdateProgramMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProgram,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}

export function useCreateProgramMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProgram,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}
