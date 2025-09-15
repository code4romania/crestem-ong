import qs from "qs";
import API from "../api";
import type {
  MentorActivityModel,
  MentorDimensionModel,
  MentorProgramModel,
  PaginationRequest,
  RoleModel,
  UploadFileDocumentModel,
} from "./types";

export interface ListMentorsRequest {
  page: number;
  pageSize: number;
}

export interface MentorModel {
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
  // domains: MentorDomainModel[];
  programs: MentorProgramModel[];
  dimensions: MentorDimensionModel[];
  avatar?: UploadFileDocumentModel;
  mentorActivities?: MentorActivityModel[];
}

export const listMentors = ({
  page,
  pageSize,
}: PaginationRequest): Promise<MentorModel[]> => {
  const params = {
    filters: {
      role: {
        type: {
          $eq: "mentor",
        },
      },
    },
    populate: [
      "role",
      "domains",
      "programs",
      "dimensions",
      "mentorActivities",
      "avatar",
    ],
    sort: "createdAt:desc",
    pagination: {
      page,
      pageSize,
    },
  };

  return API.get<MentorModel[]>(`api/users`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
