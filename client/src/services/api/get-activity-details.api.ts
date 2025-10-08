import qs from "qs";
import { API } from "../api";
import type { MentorActivityModel } from "./types";

interface ActivityDetailsResponse {
  data: ListReportsResponseData;
  meta: Meta;
}

interface ListReportsResponseData {
  id: number;
  attributes: ListReportsResponseDataAttributes;
}

interface ListReportsResponseDataAttributes {
  startDate: string;
  notes: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  dimension: Dimension;
  type: Dimension;
  user: User;
  mentor: User;
}

interface Dimension {
  data: DimensionData;
}

interface DimensionData {
  id: number;
  attributes: DimensionDataAttributes;
}

interface DimensionDataAttributes {
  name: string;
  link?: string | undefined;
  createdAt: string;
  updatedAt: string;
}

interface User {
  data: UserData;
}

interface UserData {
  id: number;
  attributes: UserDataAttributes;
}

interface UserDataAttributes {
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
  accountFacebook: string | undefined;
  accountTwitter: string | undefined;
  accountTiktok: string | undefined;
  accountInstagram: string | undefined;
  accountLinkedin: string | undefined;
  bio: string | undefined;
  expertise: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  available: boolean;
}

interface Meta {}

export const getActivityDetails = (
  activityId: string
): Promise<MentorActivityModel> => {
  const params = {
    populate: ["dimension", "type", "user", "mentor"],
  };

  return API.get<ActivityDetailsResponse>(`api/activities/${activityId}`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => ({
    ...res.data.data,
    ...res.data.data.attributes,
    dimension: {
      ...res.data.data.attributes.dimension.data,
      ...res.data.data.attributes.dimension.data.attributes,
      quiz: [],
    },
    type: {
      ...res.data.data.attributes.type.data,
      ...res.data.data.attributes.type.data.attributes,
    },
    user: {
      ...res.data.data.attributes.user.data,
      ...res.data.data.attributes.user.data.attributes,
    },
    mentor: {
      ...res.data.data.attributes.mentor.data,
      ...res.data.data.attributes.mentor.data.attributes,
    },
  }));
};
