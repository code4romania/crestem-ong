import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getUserMentorActivities } from "./api/get-user-mentor-activities.api";
import type { MentorActivityModel } from "./api/types";
import { getActivityDetails } from "./api/get-activity-details.api";

export const listUserMentorActivitiesQueryOptions = <
  TResult = MentorActivityModel[]
>(
  userId: number,
  select?: (data: MentorActivityModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["user", userId, "mentor-activities"],
    queryFn: () => getUserMentorActivities(userId),
    select,
  });

export const useSuspenseListUserMentorActivities = <
  TResult = MentorActivityModel[]
>(
  userId: number,
  select?: (data: MentorActivityModel[]) => TResult
) => useSuspenseQuery(listUserMentorActivitiesQueryOptions(userId, select));

export const useListUserMentorActivities = <TResult = MentorActivityModel[]>(
  userId: number,
  select?: (data: MentorActivityModel[]) => TResult
) => useQuery(listUserMentorActivitiesQueryOptions(userId, select));

export const getActivityByIdQueryOptions = <TResult = MentorActivityModel>(
  activityId: string,
  select?: (data: MentorActivityModel) => TResult
) =>
  queryOptions({
    queryKey: ["activities", activityId],
    queryFn: () => getActivityDetails(activityId),
    select,
  });

export const useGetActivityById = <TResult = MentorActivityModel>(
  activityId: string,
  select?: (data: MentorActivityModel) => TResult
) => useQuery(getActivityByIdQueryOptions(activityId, select));

export const useSuspenseGetActivityById = <TResult = MentorActivityModel>(
  activityId: string,
  select?: (data: MentorActivityModel) => TResult
) => useSuspenseQuery(getActivityByIdQueryOptions(activityId, select));
