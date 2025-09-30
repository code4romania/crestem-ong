import qs from "qs";
import { API } from "../api";
import type { Avatar, FinalRoleType } from "./types";

export interface MeModel {
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
  phone: string;
  website: string;
  keywords: string;
  description: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  accountFacebook: string;
  accountTwitter: string;
  accountTiktok: string;
  accountInstagram: string;
  accountLinkedin: string;
  createdAt: string;
  updatedAt: string;
  bio: string;
  expertise: string;
  firstName: string;
  lastName: string;
  available: boolean;
  avatar: Avatar;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  type: FinalRoleType;
  createdAt: string;
  updatedAt: string;
}

export const getMe = (): Promise<MeModel> => {
  const params = { populate: ["role", "avatar"] };
  return API.get<MeModel>(`api/users/me`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
