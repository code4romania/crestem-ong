import { publicAPI } from "../api";
export interface LoginRequest {
  identifier: string;
  password: string;
}
export interface LoginResponse {
  jwt: string;
  user: { username: string };
}
export const loginUser = (request: LoginRequest): Promise<LoginResponse> => {
  return publicAPI
    .post<LoginResponse>(`api/auth/local`, request)
    .then((res) => res.data);
};
