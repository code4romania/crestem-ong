import API from "../api";
export interface RegisterUserRequest {
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
}

export interface RegisterUserResponse {}

export const registerUser = (
  request: RegisterUserRequest
): Promise<RegisterUserResponse> => {
  return API.post<RegisterUserResponse>(
    `api/auth/local/register`,
    request
  ).then((res) => res.data);
};
