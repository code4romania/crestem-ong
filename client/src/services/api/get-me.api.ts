import qs from "qs";
import { API } from "../api";
import type { FinalDetailedUserModel, FinalRoleType } from "./types";

export interface Role {
  id: number;
  name: string;
  description: string;
  type: FinalRoleType;
  createdAt: string;
  updatedAt: string;
}

export const getMe = (): Promise<FinalDetailedUserModel> => {
  const params = {
    populate: [
      "role",
      "avatar",
      "ngoPrograms.program",
      "mentorPrograms.program",
      "userSessions.mentor",
    ],
  };
  return API.get<FinalDetailedUserModel>(`api/users/me`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
