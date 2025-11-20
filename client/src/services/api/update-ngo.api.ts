import { API } from "../api";
export interface UpdateNgoRequest {
  id: number;
  ongName: string;

  ongIdentificationNumber: string;
  county: string;
  city: string;
  email: string;
  phone: string;
  domains: number[];
  website: string;
  keywords: string;
  description: string;
  contactFirstName: string;
  contactLastName: string;
  contactPhone: string;
  contactEmail?: string | undefined;
  accountFacebook?: string | undefined;
  accountTwitter?: string | undefined;
  accountTiktok?: string | undefined;
  accountInstagram?: string | undefined;
  accountLinkedin?: string | undefined;

  // mentor fields
  firstName?: string;
  lastName?: string;
  dimensions?: number[];
}

export const updateNgo = ({
  id,
  ...request
}: UpdateNgoRequest): Promise<void> => {
  return API.put<void>(`api/users/${id}`, request).then((res) => res.data);
};
