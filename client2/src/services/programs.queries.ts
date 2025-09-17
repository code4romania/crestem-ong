import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  listPrograms,
  type ListProgramsResponse,
} from "./api/list-programs.api";
import type { PaginationRequest } from "./api/types";
import { getProgram, type ProgramModel } from "./api/get-program.api";

export const listProgramsQueryOptions = <TResult = ListProgramsResponse>(
  filters?: {
    search?: string;
    startDate?: string;
    endDate?: string;
  } & PaginationRequest,
  select?: (data: ListProgramsResponse) => TResult
) =>
  queryOptions({
    queryKey: ["programs", filters],
    queryFn: () => listPrograms(filters),
    staleTime: 0,
    select,
  });

export const useSuspenseListPrograms = <TResult = ListProgramsResponse>(
  filters?: {
    search?: string;
    startDate?: string;
    endDate?: string;
  } & PaginationRequest,
  select?: (data: ListProgramsResponse) => TResult
) => useSuspenseQuery(listProgramsQueryOptions(filters, select));

export const useListPrograms = <TResult = ListProgramsResponse>(
  filters?: {
    search?: string;
    startDate?: string;
    endDate?: string;
  } & PaginationRequest,
  select?: (data: ListProgramsResponse) => TResult
) => useQuery(listProgramsQueryOptions(filters, select));

export const getProgramQueryOptions = <TResult = ProgramModel>(
  programId: string,
  select?: (data: ProgramModel) => TResult
) =>
  queryOptions({
    queryKey: ["programs", programId],
    queryFn: () => getProgram(programId),
    staleTime: 0,
    select,
  });

export const useGetProgram = <TResult = ProgramModel>(
  programId: string,
  select?: (data: ProgramModel) => TResult
) => useQuery(getProgramQueryOptions(programId, select));

export const useSuspenseGetProgram = <TResult = ProgramModel>(
  programId: string,
  select?: (data: ProgramModel) => TResult
) => useSuspenseQuery(getProgramQueryOptions(programId, select));
