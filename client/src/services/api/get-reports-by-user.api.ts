import qs from "qs";
import { API } from "../api";
import type {
  FinalDimensionModel,
  FinalDomainModel,
  FinalReportModel,
} from "./types";

export interface Dimension {
  id: number;
  name: string;
  link: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FinalUserModel {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  ongName: string | null;
  ongIdentificationNumber: string | null;
  county: string | null;
  city: string | null;
  phone: string | null;
  website: string | null;
  keywords: string | null;
  description: string | null;
  contactFirstName: string | null;
  contactLastName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  createdAt: string;
  updatedAt: string;
  accountFacebook: string | null;
  accountTwitter: string | null;
  accountTiktok: string | null;
  accountInstagram: string | null;
  accountLinkedin: string | null;
  bio: string | null;
  expertise: string | null;
  firstName: string | null;
  lastName: string | null;
  available: boolean;
  reports: FinalReportModel[];
  domains: FinalDomainModel[];
  dimensions: FinalDimensionModel[];
}

export const getReportsByUser = (userId: string): Promise<any> => {
  const params = {
    populate: ["dimensions"],
  };

  return API.get<any>(`api/users/${userId}`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
