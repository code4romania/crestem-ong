import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  listDimensions,
  type ListDimensionsResponse,
} from "./api/list-dimensions.api";

export const listDimensionsQueryOptions = <TResult = ListDimensionsResponse>(
  select?: (data: ListDimensionsResponse) => TResult
) =>
  queryOptions({
    queryKey: ["dimensions"],
    queryFn: listDimensions,
    staleTime: 0,
    select,
  });

export const useSuspenseListDimensions = <TResult = ListDimensionsResponse>(
  select?: (data: ListDimensionsResponse) => TResult
) => useSuspenseQuery(listDimensionsQueryOptions(select));

export const useListDimensions = <TResult = ListDimensionsResponse>(
  select?: (data: ListDimensionsResponse) => TResult
) => useQuery(listDimensionsQueryOptions(select));
