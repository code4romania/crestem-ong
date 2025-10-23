import { API } from "../api";
import type { FinalEvaluationModel } from "./types";
export interface UpsertEvaluationRequest {
  evaluationId: string;
  dimensions: UpsertEvaluationDimensionRequest[];
}
export interface UpsertEvaluationDimensionRequest {
  id?: number | string; // id is optional for cases where it's a new request
  comment: string;
  quiz: UpsertEvaluationDimensionQuizRequest[];
}
export interface UpsertEvaluationDimensionQuizRequest {
  id?: number | string; // id is optional for cases where it's a new request
  answer: number;
}

export const upsertEvaluation = ({
  evaluationId,
  dimensions,
}: UpsertEvaluationRequest): Promise<FinalEvaluationModel> => {
  return API.put<FinalEvaluationModel>(`api/evaluations/${evaluationId}`, {
    data: { dimensions },
  }).then((res) => res.data);
};
