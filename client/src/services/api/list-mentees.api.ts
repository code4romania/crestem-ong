import qs from "qs";
import { API } from "../api";
import type { FinalDetailedUserModel } from "./types";

export const listMentees = (
  userId: number
): Promise<FinalDetailedUserModel[]> => {
  const params = {
    filters: {
      mentor: {
        id: {
          $eq: userId,
        },
      },
    },
    populate: ["user", "program", "domains"],
    pagination: {
      page: 1,
      pageSize: 100,
    },
  };

  return API.get<Array<FinalDetailedUserModel>>(`api/mentorship-requests`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data ?? []);
};
