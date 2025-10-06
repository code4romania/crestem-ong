import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity } from "./api/create-activity.api";

export function useCreateActivityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
}
