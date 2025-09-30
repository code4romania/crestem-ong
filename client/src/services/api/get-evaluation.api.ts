import { API } from "../api";
import type { FinalEvaluationModel } from "./types";

export const getEvaluation = (
  evaluationId: string,
  email: string
): Promise<FinalEvaluationModel> => {
  const params = {
    email,
  };

  return API.get<FinalEvaluationModel>(`api/evaluations/${evaluationId}`, {
    params,
  }).then((res) => res.data);
};
