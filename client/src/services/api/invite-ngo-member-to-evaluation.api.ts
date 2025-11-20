import { API } from "../api";
export interface InviteNGOMemberToEvaluation {
  report: number;
  email: string;
}
export const inviteNGOMemberToEvaluation = (
  request: InviteNGOMemberToEvaluation
): Promise<void> => {
  return API.post(`api/evaluations`, {
    data: request,
  }).then((res) => res.data);
};
