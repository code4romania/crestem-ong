import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getEvaluation } from "./api/get-evaluation.api";
import type { FinalEvaluationModel } from "./api/types";

export const getEvaluationQueryOptions = <TResult = FinalEvaluationModel>(
  evaluationId: string,
  email: string,
  select?: (data: FinalEvaluationModel) => TResult
) =>
  queryOptions({
    queryKey: ["evaluation", evaluationId, email],
    queryFn: () => getEvaluation(evaluationId, email),
    select,
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
