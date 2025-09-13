import API from "../api";

export const forgotPassword = (email: string): Promise<void> => {
  return API.post(`api/auth/forgot-password`, { email }).then(
    (res) => res.data
  );
};
