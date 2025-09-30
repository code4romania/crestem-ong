import { publicAPI } from "../api";
export interface RegistrationInfoModel {
  id: number;
  email: string;
  ongName: string;
  firstName: string;
  lastName: string;
}
export const getRegistrationInfo = (
  registrationToken: string
): Promise<RegistrationInfoModel> => {
  return publicAPI
    .get<RegistrationInfoModel>(
      `api/users-permissions/registration-info?registrationToken=${registrationToken}`
    )
    .then((res) => res.data);
};
