import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listMentors } from "./api/list-mentors.api";
import type { PaginationRequest } from "./api/types";

export const listMentorsQueryOptions = () =>
  queryOptions({
    queryKey: ["mentors"],
    queryFn: () => listMentors(),
    staleTime: 0,
    placeholderData: [],
  });

export const useSuspenseListMentors = () =>
  useSuspenseQuery(listMentorsQueryOptions());

export const useListMentors = () => useQuery(listMentorsQueryOptions());
