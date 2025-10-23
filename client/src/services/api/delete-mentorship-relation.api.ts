import { API } from "../api";

export const deleteMentorshipRelation = (
  mentorshipRelationId: number
): Promise<void> => {
  return API.delete<void>(
    `api/mentorship-requests/${mentorshipRelationId}`
  ).then((res) => res.data);
};
