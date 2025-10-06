import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getEvaluation } from "./api/get-evaluation.api";
import type { FinalEvaluationModel } from "./api/types";
import {
  listEvaluations,
  type ListReportsResponse,
} from "./api/list-evaluations.api";

export const getEvaluationQueryOptions = <TResult = FinalEvaluationModel>(
  evaluationId: string,
  email: string,
  select?: (data: FinalEvaluationModel) => TResult
) =>
  queryOptions({
    queryKey: ["evaluations", evaluationId, email],
    queryFn: () => getEvaluation(evaluationId, email),
    select,
    throwOnError: true,
  });

export const useGetEvaluation = <TResult = FinalEvaluationModel>(
  evaluationId: string,
  email: string,
  select?: (data: FinalEvaluationModel) => TResult
) => useQuery(getEvaluationQueryOptions(evaluationId, email, select));

export const useSuspenseGetEvaluation = <TResult = FinalEvaluationModel>(
  evaluationId: string,
  email: string,
  select?: (data: FinalEvaluationModel) => TResult
) => useSuspenseQuery(getEvaluationQueryOptions(evaluationId, email, select));

export const listEvaluationsQueryOptions = <TResult = ListReportsResponse>(
  select?: (data: ListReportsResponse) => TResult
) =>
  queryOptions({
    queryKey: ["evaluations"],
    queryFn: listEvaluations,
    select,
    throwOnError: true,
  });

export const useListEvaluations = <TResult = ListReportsResponse>(
  select?: (data: ListReportsResponse) => TResult
) => useQuery(listEvaluationsQueryOptions(select));
