import qs from "qs";
import { API } from "../api";
import type {
  Avatar,
  FinalDetailedUserModel,
  FinalDimensionModel,
  FinalDomainModel,
  FinalProgramModel,
  FinalReportModel,
  FinalUserModel,
  MentorshipRelationModel,
  RoleModel,
} from "./types";

interface APIUserModel {
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

interface APIDetailedUserModel extends APIUserModel {
  userSessions: MentorshipRelationModel[];
  domains: FinalDomainModel[];
  dimensions: FinalDimensionModel[];
  reports: FinalReportModel[];
  role: RoleModel;
}

export const getUserDetails = (
  userId: string
): Promise<FinalDetailedUserModel> => {
  const params = {
    populate: [
      "domains",
      "reports.evaluations.dimensions.quiz",
      "avatar",
      "dimensions",
      "role",
      "userSessions.mentor",
      "mentorPrograms.program",
      "ngoPrograms.program",
    ],
  };

  return API.get<APIDetailedUserModel>(`api/users/${userId}`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => ({
    ...res.data,
    mentors: res.data?.userSessions?.map((s) => s.mentor) ?? [],
    ngoPrograms: res.data?.ngoPrograms?.map((p) => p.program) ?? [],
    mentorPrograms: res.data?.mentorPrograms?.map((p) => p.program) ?? [],
  }));
};
