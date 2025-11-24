import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listNgos, listNgosWithDetails } from "./api/list-ngos.api";
import type { FinalDetailedUserModel, FinalUserModel } from "./api/types";

export const listNgosQueryOptions = <TResult = FinalUserModel[]>(
  select?: (data: FinalUserModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["ngos"],
    queryFn: listNgos,
    select,
  });

export const useSuspenseListNgos = <TResult = FinalUserModel[]>(
  select?: (data: FinalUserModel[]) => TResult
) => useSuspenseQuery(listNgosQueryOptions(select));

export const useListNgos = <TResult = FinalUserModel[]>(
  select?: (data: FinalUserModel[]) => TResult
) => useQuery(listNgosQueryOptions(select));

export const listNgosWithDetailsQueryOptions = <
  TResult = FinalDetailedUserModel[]
>(
  select?: (data: FinalDetailedUserModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["ngos-detailed"],
    queryFn: listNgosWithDetails,
    select,
  });

export const useSuspenseListNgosWithDetails = <
  TResult = FinalDetailedUserModel[]
>(
  select?: (data: FinalDetailedUserModel[]) => TResult
) => useSuspenseQuery(listNgosWithDetailsQueryOptions(select));

export const useListNgosWithDetails = <TResult = FinalDetailedUserModel[]>(
  select?: (data: FinalDetailedUserModel[]) => TResult
) => useQuery(listNgosWithDetailsQueryOptions(select));
