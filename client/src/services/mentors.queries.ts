import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listMentors } from "./api/list-mentors.api";
import { listMentorshipRelations } from "./api/list-mentorship-relations";
import type { MentorshipRelationModel } from "./api/types";

export const listMentorsQueryOptions = () =>
  queryOptions({
    queryKey: ["mentors"],
    queryFn: () => listMentors(),
    placeholderData: [],
  });

export const useSuspenseListMentors = () =>
  useSuspenseQuery(listMentorsQueryOptions());

export const useListMentors = () => useQuery(listMentorsQueryOptions());

export const listMentorshipRelationsQueryOptions = <
  TResult = MentorshipRelationModel[]
>(
  select?: (data: MentorshipRelationModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["mentorship-relations"],
    queryFn: () => listMentorshipRelations(),
    placeholderData: [],
    select,
  });

export const useListMentorshipRelations = <TResult = MentorshipRelationModel[]>(
  select?: (data: MentorshipRelationModel[]) => TResult
) => useQuery(listMentorshipRelationsQueryOptions(select));
