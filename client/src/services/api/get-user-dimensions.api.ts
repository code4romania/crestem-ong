import qs from "qs";
import { API } from "../api";
import type { FinalDimensionModel } from "./types";

interface GetUserDomains {
  dimensions: FinalDimensionModel[];
}

export const getUserDimensions = (): Promise<FinalDimensionModel[]> => {
  const params = {
    populate: ["dimensions"],
  };

  return API.get<GetUserDomains>(`api/users/me`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data.dimensions ?? []);
};
