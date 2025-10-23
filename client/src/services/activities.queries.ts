import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getMentorMentorActivities } from "./api/get-mentor-mentor-activities.api";
import { getNgoMentorActivities } from "./api/get-ngo-mentor-activities.api";
import type { MentorActivityModel } from "./api/types";
import { getActivityDetails } from "./api/get-activity-details.api";

export const listMentorMentorActivitiesQueryOptions = <
  TResult = MentorActivityModel[]
>(
  userId: number,
  select?: (data: MentorActivityModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["user", userId, "mentor-activities"],
    queryFn: () => getMentorMentorActivities(userId),
    select,
  });

export const useSuspenseListMentorMentorActivities = <
  TResult = MentorActivityModel[]
>(
  userId: number,
  select?: (data: MentorActivityModel[]) => TResult
) => useSuspenseQuery(listMentorMentorActivitiesQueryOptions(userId, select));

export const useListMentorMentorActivities = <TResult = MentorActivityModel[]>(
  userId: number,
  select?: (data: MentorActivityModel[]) => TResult
) => useQuery(listMentorMentorActivitiesQueryOptions(userId, select));

export const listNgoMentorActivitiesQueryOptions = <
  TResult = MentorActivityModel[]
>(
  ngoId: number,
  select?: (data: MentorActivityModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["user", ngoId, "mentor-activities"],
    queryFn: () => getNgoMentorActivities(ngoId),
    select,
  });

export const useSuspenseListNgoMentorActivities = <
  TResult = MentorActivityModel[]
>(
  ngoId: number,
  select?: (data: MentorActivityModel[]) => TResult
) => useSuspenseQuery(listNgoMentorActivitiesQueryOptions(ngoId, select));

export const useListNgoMentorActivities = <TResult = MentorActivityModel[]>(
  ngoId: number,
  select?: (data: MentorActivityModel[]) => TResult
) => useQuery(listNgoMentorActivitiesQueryOptions(ngoId, select));

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
