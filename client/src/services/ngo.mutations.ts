import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerNgo } from "./api/register-ngo.api";

export function useCreateNgoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerNgo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ngos-detailed"] });
      await queryClient.invalidateQueries({ queryKey: ["ngos"] });
    },
  });
}
