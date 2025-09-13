import API from "../api";

export const registerUser = ({}: {}): Promise<void> => {
  return API.get(`auth/local/register`).then((res) => res.data);
};
