import qs from "qs";
import { API } from "../api";
import type {
  Avatar,
  FinalDetailedUserModel,
  FinalDimensionModel,
  FinalDomainModel,
  FinalProgramModel,
  FinalReportModel,
  FinalRoleType,
  FinalUserModel,
  MentorshipRelationModel,
  RoleModel,
} from "./types";

export interface Role {
  id: number;
  name: string;
  description: string;
  type: FinalRoleType;
  createdAt: string;
  updatedAt: string;
}

interface APIFinalUserModel {
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
  avatar?: Avatar;
  domains?: FinalDomainModel[];
  dimensions?: FinalDimensionModel[];
  mentorActivities?: any[];
  reports?: FinalReportModel[];
  mentors?: FinalUserModel[];
  ngoPrograms: Array<{ id: number; program: FinalProgramModel }>;
  mentorPrograms: Array<{ id: number; program: FinalProgramModel }>;

  programJoinedAt?: string;
}

interface APIFinalDetailedUserModel extends APIFinalUserModel {
  userSessions: MentorshipRelationModel[];
  domains: FinalDomainModel[];
  dimensions: FinalDimensionModel[];
  reports: FinalReportModel[];
  role: RoleModel;
}

export const getMe = (): Promise<FinalDetailedUserModel> => {
  const params = {
    populate: [
      "role",
      "avatar",
      "ngoPrograms.program",
      "mentorPrograms.program",
      "userSessions.mentor",
      "mentorshipRequest.mentor",
    ],
  };
  return API.get<APIFinalDetailedUserModel>(`api/users/me`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then(
    (res): FinalDetailedUserModel => ({
      ...res.data,
      ngoPrograms: res.data?.ngoPrograms?.map((p) => p.program) ?? [],
      mentorPrograms: res.data?.mentorPrograms?.map((p) => p.program) ?? [],
    })
  );
};
