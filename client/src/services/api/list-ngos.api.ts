import qs from "qs";
import { API } from "../api";
import type {
  Avatar,
  FinalDetailedUserModel,
  FinalDomainModel,
  FinalReportModel,
  FinalUserModel,
} from "./types";

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

export interface ProgramModel {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  sponsorName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

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
