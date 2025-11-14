import { API } from "../api";

export interface CreateMentorRequest {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  expertise?: string;
  dimensions: number[];
  programs: number[];
}
export interface CreateMentorResponse {
  jwt: string;
  id: number;
}
export const createMentor = (
  request: CreateMentorRequest
): Promise<CreateMentorResponse> => {
  return API.post<CreateMentorResponse>(`api/users`, {
    ...request,
    username: request.email,
    password: "temporary-password", // TODO: make it a random guid
    role: 4,
  }).then((res) => res.data);
};
