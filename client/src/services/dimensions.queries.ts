import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listDimensions } from "./api/list-dimensions.api";
import type { DimensionModel as ApiDimensionModel } from "./api/types";

export const listDimensionsQueryOptions = <TResult = ApiDimensionModel[]>(
  select?: (data: ApiDimensionModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["dimensions"],
    queryFn: listDimensions,
    select,
  });

export const useSuspenseListDimensions = <TResult = ApiDimensionModel[]>(
  select?: (data: ApiDimensionModel[]) => TResult
) => useSuspenseQuery(listDimensionsQueryOptions(select));

export const useListDimensions = <TResult = ApiDimensionModel[]>(
  select?: (data: ApiDimensionModel[]) => TResult
) => useQuery(listDimensionsQueryOptions(select));
