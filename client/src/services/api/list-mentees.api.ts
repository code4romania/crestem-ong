import qs from "qs";
import { API } from "../api";
import type { FinalDetailedUserModel } from "./types";

export const listMentees = (): Promise<FinalDetailedUserModel[]> => {
  const params = {
    populate: ["user", "ngoPrograms.program", "domains"],
    pagination: {
      page: 1,
      pageSize: 100,
    },
  };

  return API.get<
    Array<{ mentor: FinalDetailedUserModel; user: FinalDetailedUserModel }>
  >(`api/mentorship-requests`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data?.map((m) => m.user).filter(Boolean) ?? []);
};
