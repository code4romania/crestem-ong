import { API } from "../api";

export const resendEvaluationInvite = (
  evaluationId: number
): Promise<{ notificationSentAt?: string; nextAvailableTime?: string }> => {
  return API.post(`api/evaluations/${evaluationId}/resend`).then(
    (res) => res.data
  );
};
