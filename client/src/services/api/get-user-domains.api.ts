import qs from "qs";
import { API } from "../api";
import type { FinalDomainModel } from "./types";

interface GetUserDomains {
  domains: FinalDomainModel[];
}

export const getUserDomains = (): Promise<FinalDomainModel[]> => {
  const params = {
    populate: ["domains"],
  };

  return API.get<GetUserDomains>(`api/users/me`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data.domains ?? []);
};
