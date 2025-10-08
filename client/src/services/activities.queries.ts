import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getMentorActivities } from "./api/get-mentor-activities.api";
import type { MentorActivityModel } from "./api/types";
import { getActivityDetails } from "./api/get-activity-details.api";

export const listMentorActivities = <TResult = MentorActivityModel[]>(
  mentorId: number,
  select?: (data: MentorActivityModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["mentor", mentorId, "activities"],
    queryFn: () => getMentorActivities(mentorId),
    select,
  });

export const useSuspenseListMentorActivities = <
  TResult = MentorActivityModel[]
>(
  mentorId: number,
  select?: (data: MentorActivityModel[]) => TResult
) => useSuspenseQuery(listMentorActivities(mentorId, select));

export const useListMentorActivities = <TResult = MentorActivityModel[]>(
  mentorId: number,
  select?: (data: MentorActivityModel[]) => TResult
) => useQuery(listMentorActivities(mentorId, select));

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
