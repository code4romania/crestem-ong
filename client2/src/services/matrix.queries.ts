import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getMatrix } from "./api/get-matrix.api";
import type { FinalMatrixModel } from "./api/types";

export const getMatrixQueryOptions = <TResult = FinalMatrixModel>(
  select?: (data: FinalMatrixModel) => TResult
) =>
  queryOptions({
    queryKey: ["matrix"],
    queryFn: () => getMatrix(),
    select,
  });

export const useSuspenseGetMatrix = <TResult = FinalMatrixModel>(
  select?: (data: FinalMatrixModel) => TResult
) => useSuspenseQuery(getMatrixQueryOptions(select));

export const useGetMatrix = <TResult = FinalMatrixModel>(
  select?: (data: FinalMatrixModel) => TResult
) => useQuery(getMatrixQueryOptions(select));
