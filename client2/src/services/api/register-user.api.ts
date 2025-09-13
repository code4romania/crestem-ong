import API from "../api";

export const registerUser = ({}: {}): Promise<any> => {
  return API.get(`auth/local/register`).then((res) => res.data.guides);
};
