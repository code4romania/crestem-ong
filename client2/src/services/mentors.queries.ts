import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listMentors } from "./api/list-mentors.api";

export const listMentorsQueryOptions = () =>
  queryOptions({
    queryKey: ["mentors"],
    queryFn: () => listMentors(),
    placeholderData: [],
  });

export const useSuspenseListMentors = () =>
  useSuspenseQuery(listMentorsQueryOptions());

export const useListMentors = () => useQuery(listMentorsQueryOptions());
