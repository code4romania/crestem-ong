import qs from "qs";
import { API } from "../api";
import type {
  Avatar,
  FinalDetailedUserModel,
  FinalDimensionModel,
  FinalDomainModel,
  FinalProgramModel,
  MentorActivityModel,
  RoleModel,
} from "./types";

export interface ListMentorsRequest {
  page: number;
  pageSize: number;
}

interface MentorModel {
  createdAt: string;
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  ongName: any;
  ongIdentificationNumber: any;
  county: any;
  city: any;
  phone: any;
  website: any;
  keywords: any;
  description: any;
  contactFirstName: any;
  contactLastName: any;
  contactEmail: any;
  contactPhone: any;
  updatedAt: string;
  accountFacebook: any;
  accountTwitter: any;
  accountTiktok: any;
  accountInstagram: any;
  accountLinkedin: any;
  bio: string;
  expertise: string;
  firstName: string;
  lastName: string;
  available: boolean;
  role: RoleModel;
  domains: FinalDomainModel[];
  mentorPrograms: Array<{ id: number; program: FinalProgramModel }>;
  dimensions: FinalDimensionModel[];
  avatar?: Avatar;
  mentorActivities?: MentorActivityModel[];
}

export const listMentors = (): Promise<FinalDetailedUserModel[]> => {
  const params = {
    filters: {
      role: {
        type: {
          $eq: "mentor",
        },
      },
    },
    populate: [
      "domains",
      "mentorActivities",
      "avatar",
      "dimensions",
      "mentorPrograms.program",
    ],
    sort: "createdAt:desc",
  };

  return API.get<MentorModel[]>(`api/users`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then(
    (res): FinalDetailedUserModel[] =>
      res.data?.map((m) => ({
        ...m,
        mentorPrograms: m.mentorPrograms.map((p) => p.program),
        userSessions: [],
        reports: [],
        userPrograms: [],
        dimensions: m.dimensions,
        avatar: m.avatar,
      })) ?? []
  );
};
