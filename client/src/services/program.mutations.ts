import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignMentorToProgram } from "./api/assign-mentor-to-program.api";
import { assignNgoToProgram } from "./api/assign-ngo-to-program";
import { createProgram } from "./api/create-program.api";

export function useAssignNgoToProgramMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignNgoToProgram,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}
export function useAssignMentorToProgramMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignMentorToProgram,
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
