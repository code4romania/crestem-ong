import { API } from "../api";
import type { FinalRoleType } from "./types";

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
  bio: null;
  expertise: null;
  firstName: null;
  lastName: null;
  available: boolean;
  avatar: Avatar;
  role: Role;
}

export interface Avatar {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  large: Format;
  small: Format;
  medium: Format;
  thumbnail: Format;
}

export interface Format {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
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
  return API.get<MeModel>(`api/users/me?populate[0]=role`, {}).then(
    (res) => res.data
  );
};
