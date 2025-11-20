import { publicAPI } from "../api";

export interface ConfirmAccountRequest {}
export interface ConfirmAccountResponse {
  jwt: string;
  user: { username: string };
}
export const confirmAccount = (
  request: ConfirmAccountRequest
): Promise<ConfirmAccountResponse> => {
  return publicAPI
    .post<ConfirmAccountResponse>(`api/users-permissions/register`, {
      data: request,
    })
    .then((res) => res.data);
};
