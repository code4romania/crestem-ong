import { publicAPI } from "../api";

export const forgotPassword = (email: string): Promise<void> => {
  return publicAPI
    .post(`api/auth/forgot-password`, { email })
    .then((res) => res.data);
};
