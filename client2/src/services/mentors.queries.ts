import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listMentors } from "./api/list-mentors";
import type { PaginationRequest } from "./api/types";

export const mentorsQueryOptions = (request: PaginationRequest) =>
  queryOptions({
    queryKey: ["mentors", request],
    queryFn: () => listMentors(request),
    staleTime: 0,
    placeholderData: [],
  });

export const useSuspenseMentors = (request: PaginationRequest) =>
  useSuspenseQuery(mentorsQueryOptions(request));

export const useMentors = (request: PaginationRequest) =>
  useQuery(mentorsQueryOptions(request));
