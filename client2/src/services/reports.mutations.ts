import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReport } from "./api/create-report.api";
import { updateReport } from "./api/update-reports.api";

export function useCreateReportMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReport,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}

export function useUpdateReportMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReport,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}
