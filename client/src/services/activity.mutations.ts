import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity } from "./api/create-activity.api";
import { deleteActivity } from "./api/delete-activity.api";
import {
  updateActivity,
  type UpdateActivityRequest,
} from "./api/update-activity.api";
import { router } from "..";

export function useCreateActivityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["me", "mentor-activities"] });
    },
  });
}

export function useDeleteActivityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["me", "mentor-activities"] });
    },
  });
}

export function useUpdateActivityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateActivityRequest) => updateActivity(request),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["me", "mentor-activities"],
      });
      await router.invalidate();
    },
  });
}
