import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listMentors } from "./api/list-mentors.api";
import type { PaginationRequest } from "./api/types";

export const listMentorsQueryOptions = (request?: PaginationRequest) =>
  queryOptions({
    queryKey: ["mentors", request],
    queryFn: () => listMentors(request),
    staleTime: 0,
    placeholderData: [],
  });

export const useSuspenseListMentors = (request?: PaginationRequest) =>
  useSuspenseQuery(listMentorsQueryOptions(request));

export const useListMentors = (request?: PaginationRequest) =>
  useQuery(listMentorsQueryOptions(request));
