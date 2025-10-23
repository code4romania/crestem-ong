import qs from "qs";
import { API } from "../api";
import type { FinalUserModel, MentorshipRelationModel } from "./types";

interface ListMentorshipRelationsResponse {
  data: MentorshipRelation[];
  meta: Meta;
}

interface MentorshipRelation {
  id: number;
  attributes: MentorshipRelationAttributes;
}

interface MentorshipRelationAttributes {
  createdAt: string;
  updatedAt: string;
  user: { data: User };
  mentor: { data: User };
}

interface User {
  id: number;
  attributes: UserAttributes;
}

interface UserAttributes {
  username: string;
  provider: string;
  email: string;
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

export const listMentorshipRelations = (): Promise<
  MentorshipRelationModel[]
> => {
  const params = {
    populate: ["user", "mentor"],
    pagination: {
      page: 1,
      pageSize: 100,
    },
  };

  return API.get<ListMentorshipRelationsResponse>(`api/mentorship-requests`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) =>
    res.data.data.map(
      (m): MentorshipRelationModel => ({
        id: m.id,
        createdAt: m.attributes.createdAt,
        updatedAt: m.attributes.updatedAt,
        user: {
          id: m.attributes.user.data?.id,
          ...m.attributes.user.data?.attributes,
        },
        mentor: {
          id: m.attributes.mentor.data?.id,
          ...m.attributes.mentor.data?.attributes,
        },
      })
    )
  );
};
