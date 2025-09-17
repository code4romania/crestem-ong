import qs from "qs";
import { API } from "../api";
import type { PaginationRequest } from "./types";

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

export const listNgos = (
  pagination?: PaginationRequest
): Promise<NgoModel[]> => {
  const params = {
    filters: {
      role: {
        type: {
          $eq: "authenticated",
        },
      },
    },
    populate: ["role"],
    sort: "createdAt:desc",
    pagination,
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
