import qs from "qs";
import { API } from "../api";
import type { MentorActivityModel } from "./types";

interface ActivityDetailsResponse {
  data: ActivityDetailsResponseData;
}

interface ActivityDetailsResponseData {
  id: number;
  attributes: ActivityDetailsAttributes;
}

interface ActivityDetailsAttributes {
  startDate: string;
  notes: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  dimension: DimensionResponse;
  type: TypeResponse;
  user: UserResponse;
  mentor: UserResponse;
}

interface DimensionResponse {
  data: DimensionData;
}
interface TypeResponse {
  data: TypeData;
}

interface TypeData {
  id: number;
  attributes: TypeAttributes;
}
interface DimensionData {
  id: number;
  attributes: DimensionAttributes;
}

interface TypeAttributes {
  name: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

interface DimensionAttributes {
  name: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserResponse {
  data: UserData;
}

interface UserData {
  id: number;
  attributes: TentacledAttributes;
}

interface TentacledAttributes {
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
    id: res.data.data.id,
    startDate: res.data.data.attributes.startDate,
    notes: res.data.data.attributes.notes,
    duration: res.data.data.attributes.duration,
    dimension: {
      ...res.data.data.attributes.dimension.data.attributes,
      id: res.data.data.attributes.dimension.data.id,
      quiz: [],
    },
    type: {
      ...res.data.data.attributes.type.data.attributes,
      id: res.data.data.attributes.type.data.id,
    },
    user: {
      ...res.data.data.attributes.user.data.attributes,
      id: res.data.data.attributes.user.data.id,
    },
    createdAt: res.data.data.attributes.createdAt,
    updatedAt: res.data.data.attributes.updatedAt,
    mentor: {
      ...res.data.data.attributes.mentor.data.attributes,
      id: res.data.data.attributes.mentor.data.id,
    },
  }));
};
