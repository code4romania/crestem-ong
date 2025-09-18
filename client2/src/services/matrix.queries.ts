import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getMatrix, type MatrixModel } from "./api/get-matrix.api";

export const getMatrixQueryOptions = <TResult = MatrixModel>(
  select?: (data: MatrixModel) => TResult
) =>
  queryOptions({
    queryKey: ["matrix"],
    queryFn: () => getMatrix(),
    select,
  });

export const useSuspenseGetMatrix = <TResult = MatrixModel>(
  select?: (data: MatrixModel) => TResult
) => useSuspenseQuery(getMatrixQueryOptions(select));

export const useGetMatrix = <TResult = MatrixModel>(
  select?: (data: MatrixModel) => TResult
) => useQuery(getMatrixQueryOptions(select));
