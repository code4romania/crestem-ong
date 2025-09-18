import qs from "qs";
import { API } from "../api";

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
  bio: any;
  expertise: any;
  firstName: any;
  lastName: any;
  available: boolean;
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
  domains: DomainModel[];
  reports: ReportModel[];
  program?: ProgramModel;
}

export interface DomainModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportModel {
  id: number;
  deadline: string;
  finished: boolean;
  createdAt: string;
  updatedAt: string;
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
