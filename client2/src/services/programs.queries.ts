import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listPrograms } from "./api/list-programs.api";

export const listProgramsQueryOptions = queryOptions({
  queryKey: ["programs"],
  queryFn: listPrograms,
  staleTime: 0,
  placeholderData: [],
});

export const useSuspenseListPrograms = () =>
  useSuspenseQuery(listProgramsQueryOptions);
export const useListPrograms = () => useQuery(listProgramsQueryOptions);
