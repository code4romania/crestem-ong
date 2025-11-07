import { publicAPI } from "../api";

export const resetPassword = (payload: {
  code: string;
  password: string;
  passwordConfirmation: string;
}): Promise<void> => {
  return publicAPI
    .post(`/auth/reset-password`, payload)
    .then((res) => res.data);
};
