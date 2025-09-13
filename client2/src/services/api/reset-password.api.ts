import API from "../api";

export const resetPassword = (payload: {
  code: string;
  password: string;
  passwordConfirmation: string;
}): Promise<void> => {
  return API.post(`/auth/reset-password`, payload).then((res) => res.data);
};
