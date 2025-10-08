import qs from "qs";
import { API } from "../api";
import type { FinalDetailedUserModel, FinalUserModel } from "./types";

export const listNgos = (): Promise<FinalUserModel[]> => {
  const params = {
    filters: {
      role: {
        type: {
          $eq: "authenticated",
        },
      },
    },
    sort: "createdAt:desc",
  };

  return API.get<FinalUserModel[]>(`api/users`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};

export const listNgosWithDetails = (): Promise<FinalDetailedUserModel[]> => {
  const params = {
    filters: {
      role: {
        type: {
          $eq: "authenticated",
        },
      },
    },
    populate: ["domains", "reports", "program"],
    sort: "createdAt:desc",
  };

  return API.get<FinalDetailedUserModel[]>(`api/users`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
