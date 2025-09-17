import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listNgos, type NgoModel } from "./api/list-ngos.api";
import type { PaginationRequest } from "./api/types";

export const listNgosQueryOptions = <TResult = NgoModel[]>(
  filters?: {
    search?: string;
    startDate?: string;
    endDate?: string;
  } & PaginationRequest,
  select?: (data: NgoModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["ngos", filters],
    queryFn: () => listNgos(filters),
    staleTime: 0,
    select,
  });

export const useSuspenseListNgos = <TResult = NgoModel[]>(
  filters?: {
    search?: string;
    startDate?: string;
    endDate?: string;
  } & PaginationRequest,
  select?: (data: NgoModel[]) => TResult
) => useSuspenseQuery(listNgosQueryOptions(filters, select));

export const useListNgos = <TResult = NgoModel[]>(
  filters?: {
    search?: string;
    startDate?: string;
    endDate?: string;
  } & PaginationRequest,
  select?: (data: NgoModel[]) => TResult
) => useQuery(listNgosQueryOptions(filters, select));

// export const getProgramQueryOptions = <TResult = ListNgosResponse>(
//   ngoId: string,
//   select?: (data: ProgramModel) => TResult
// ) =>
//   queryOptions({
//     queryKey: ["ngos", ngoId],
//     queryFn: () => getProgram(ngoId),
//     staleTime: 0,
//     select,
//   });

// export const useGetProgram = <TResult = ListNgosResponse>(
//   ngoId: string,
//   select?: (data: ProgramModel) => TResult
// ) => useQuery(getProgramQueryOptions(ngoId, select));

// export const useSuspenseGetProgram = <TResult = ListNgosResponse>(
//   ngoId: string,
//   select?: (data: ProgramModel) => TResult
// ) => useSuspenseQuery(getProgramQueryOptions(ngoId, select));
