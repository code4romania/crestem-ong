import qs from "qs";
import { API } from "../api";
import type { FinalUserModel } from "./types";

interface ListMenteesResponse {
  data: MenteeModel[];
  meta: Meta;
}

interface MenteeModel {
  id: number;
  attributes: MenteeAttributes;
}

interface MenteeAttributes {
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface User {
  data: UserModel;
}

interface UserModel {
  id: number;
  attributes: UserAttributes;
}

interface UserAttributes {
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
  createdAt: string;
  updatedAt: string;
  accountFacebook: string;
  accountTwitter: string;
  accountTiktok: string;
  accountInstagram: string;
  accountLinkedin: string;
  bio: string;
  expertise: string;
  firstName: string;
  lastName: string;
  available: boolean;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export const listMentees = (userId: number): Promise<FinalUserModel[]> => {
  const params = {
    filters: {
      mentor: {
        id: {
          $eq: userId,
        },
      },
    },
    populate: ["user"],
    pagination: {
      page: 1,
      pageSize: 100,
    },
  };

  return API.get<ListMenteesResponse>(`api/mentorship-requests`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then(
    (res) =>
      res.data.data.map((m) => ({
        id: m.attributes.user.data.id,
        ...m.attributes.user.data.attributes,
      })) ?? []
  );
};
