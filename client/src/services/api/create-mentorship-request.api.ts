import { API } from "../api";

export interface CreateMentorshipRequestRequest {
  user: number;
  mentor: number;
}

export const createMentorshipRequest = (
  request: CreateMentorshipRequestRequest
): Promise<void> => {
  return API.post<void>(`/api/mentorship-requests`, { data: request }).then(
    (res) => res.data
  );
};
