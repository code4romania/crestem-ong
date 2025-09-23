import { publicAPI } from "../api";

export const getRegistrationInfo = (
  registrationToken: string
): Promise<any> => {
  return publicAPI
    .get<any>(
      `api/users-permissions/registration-info?registrationToken=${registrationToken}`
    )
    .then((res) => res.data);
};
