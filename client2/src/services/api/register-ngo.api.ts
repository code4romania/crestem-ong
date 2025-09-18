import { publicAPI } from "../api";
export interface RegisterNgoRequest {
  ongName: string;
  ongIdentificationNumber: string;
  county: string;
  city: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
  domains: number[];
  website: string | undefined;
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
}
export interface RegisterUserResponse {
  jwt: string;
  user: {
    id: number;
  };
}

export const registerNgo = (
  request: RegisterNgoRequest
): Promise<RegisterUserResponse> => {
  return publicAPI
    .post<RegisterUserResponse>(`api/auth/local/register`, request)
    .then((res) => res.data);
};
