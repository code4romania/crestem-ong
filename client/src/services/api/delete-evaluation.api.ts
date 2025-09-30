import { API } from "../api";

export const deleteEvaluation = (evaluationId: number): Promise<void> => {
  return API.delete(`api/evaluations/${evaluationId}`).then((res) => res.data);
};
