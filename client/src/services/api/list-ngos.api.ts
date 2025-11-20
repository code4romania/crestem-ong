import qs from "qs";
import { API } from "../api";
import type {
  FinalDetailedUserModel,
  FinalDimensionModel,
  FinalDomainModel,
  FinalProgramModel,
  FinalReportModel,
  FinalUserModel,
  MentorshipRelationModel,
  RoleModel,
} from "./types";

export const listNgos = (): Promise<FinalUserModel[]> => {
  const params = {
    filters: {
      role: {
        type: {
          $eq: "authenticated",
        },
      },
    },
    sort: "createdAt:desc",
  };

  return API.get<FinalUserModel[]>(`api/users`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};

interface APIDetailedUserModel {
  id: number;
  username: string;
  email: string;
  provider: string;
  password?: string | undefined;
  resetPasswordToken?: string | undefined;
  confirmationToken?: string | undefined;
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
  accountFacebook: string | undefined;
  accountTwitter: string | undefined;
  accountTiktok: string | undefined;
  accountInstagram: string | undefined;
  accountLinkedin: string | undefined;
  createdAt: string;
  updatedAt: string;
  registrationToken?: string | undefined;
  bio: string | undefined;
  expertise: string | undefined;
  firstName: string | undefined;
  available: boolean;
  lastName: string | undefined;
  mentorActivities?: any[];
  mentors?: FinalUserModel[];
  userSessions: MentorshipRelationModel[];
  domains: FinalDomainModel[];
  dimensions: FinalDimensionModel[];
  reports: FinalReportModel[];
  role: RoleModel;
  ngoPrograms: Array<{ id: number; program: FinalProgramModel }>;
}

export const listNgosWithDetails = (): Promise<FinalDetailedUserModel[]> => {
  const params = {
    filters: {
      role: {
        type: {
          $eq: "authenticated",
        },
      },
    },
    populate: ["domains", "reports", "ngoPrograms.program"],
    sort: "createdAt:desc",
  };

  return API.get<APIDetailedUserModel[]>(`api/users`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then(
    (res) =>
      res.data.map(
        (m): FinalDetailedUserModel => ({
          ...m,
          ngoPrograms: m.ngoPrograms.map((p) => p.program),
          mentorPrograms: [],
        })
      ) ?? []
  );
};
