import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  listNgos,
  listNgosWithDetails,
  type DetailedNgoModel,
  type NgoModel,
} from "./api/list-ngos.api";

export const listNgosQueryOptions = <TResult = NgoModel[]>(
  select?: (data: NgoModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["ngos"],
    queryFn: () => listNgos(),
    select,
  });

export const useSuspenseListNgos = <TResult = NgoModel[]>(
  select?: (data: NgoModel[]) => TResult
) => useSuspenseQuery(listNgosQueryOptions(select));

export const useListNgos = <TResult = NgoModel[]>(
  select?: (data: NgoModel[]) => TResult
) => useQuery(listNgosQueryOptions(select));

export const listNgosWithDetailsQueryOptions = <TResult = DetailedNgoModel[]>(
  select?: (data: DetailedNgoModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["ngos-detailed"],
    queryFn: () => listNgosWithDetails(),
    select,
  });

export const useSuspenseListNgosWithDetails = <TResult = DetailedNgoModel[]>(
  select?: (data: DetailedNgoModel[]) => TResult
) => useSuspenseQuery(listNgosWithDetailsQueryOptions(select));

export const useListNgosWithDetails = <TResult = DetailedNgoModel[]>(
  select?: (data: DetailedNgoModel[]) => TResult
) => useQuery(listNgosWithDetailsQueryOptions(select));
