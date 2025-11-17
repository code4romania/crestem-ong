import qs from "qs";
import { API } from "../api";
import type { FinalDetailedUserModel } from "./types";

export const getUserDetails = (
  userId: string
): Promise<FinalDetailedUserModel> => {
  const params = {
    populate: [
      "domains",
      "reports.evaluations.dimensions.quiz",
      "avatar",
      "dimensions",
      "role",
      "userSessions.mentor",
      "mentorPrograms.program",
      "ngoPrograms.program",
    ],
  };

  return API.get<FinalDetailedUserModel>(`api/users/${userId}`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => ({
    ...res.data,
    mentors: res.data?.userSessions?.map((s) => s.mentor) ?? [],
  }));
};
