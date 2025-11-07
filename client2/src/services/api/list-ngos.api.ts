import qs from "qs";
import { API } from "../api";
import type { Avatar, FinalDomainModel, FinalReportModel } from "./types";

export interface NgoModel {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  ongName: string;
  ongIdentificationNumber: string;
  county: string;
  city: string;
  phone?: string;
  website: string;
  keywords?: string;
  description?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactEmail?: string;
  contactPhone?: string;
  accountFacebook?: string;
  accountTwitter?: string;
  accountTiktok?: string;
  accountInstagram?: string;
  accountLinkedin?: string;
  createdAt: string;
  updatedAt: string;
  bio: string;
  expertise: string;
  firstName: string;
  lastName: string;
  available: boolean;
  avatar: Avatar;
}

export const listNgos = (): Promise<NgoModel[]> => {
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

  return API.get<NgoModel[]>(`api/users`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};

export interface DetailedNgoModel extends NgoModel {
  domains: FinalDomainModel[];
  reports: FinalReportModel[];
  program?: ProgramModel;
}

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

export const listNgosWithDetails = (): Promise<DetailedNgoModel[]> => {
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

  return API.get<DetailedNgoModel[]>(`api/users`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
