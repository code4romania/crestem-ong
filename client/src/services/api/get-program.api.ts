import qs from "qs";
import { API } from "../api";
import type { FinalProgramModel } from "./types";
interface GetProgramResponse {
  data: ProgramModel;
  meta: Meta;
}

interface ProgramModel {
  id: number;
  attributes: ProgramAttributes;
}

interface ProgramAttributes {
  name: string;
  startDate: string;
  endDate: string;
  sponsorName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  mentors: MentorsData;
  users: UsersData;
}

interface MentorsData {
  data: ProgramMentorModel[];
}

interface ProgramMentorModel {
  id: number;
  attributes: MentorAttributes;
}

interface MentorAttributes {
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
  dimensions: DimensionsData;
  mentorActivities: MentorActivitiesData;
}

interface DimensionsData {
  data: DimensionModel[];
}

interface DimensionModel {
  id: number;
  attributes: DimensionAttributes;
}

interface DimensionAttributes {
  id: number;
  name: string;
  link: string;
}

interface MentorActivitiesData {
  data: any[];
}

interface UsersData {
  data: UserModel[];
}

interface UserModel {
  id: number;
  attributes: UserAttributes;
}

interface UserAttributes {
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
  reports: ReportsData;
}

interface ReportsData {
  data: ReportModel[];
}

interface ReportModel {
  id: number;
  attributes: ReportAttributes;
}

interface ReportAttributes {
  deadline: string;
  finished: boolean;
  createdAt: string;
  updatedAt: string;
  evaluations: EvaluationsData;
}

interface EvaluationsData {
  data: EvaluationModel[];
}

interface EvaluationModel {
  id: number;
  attributes: EvaluationAttributes;
}

interface EvaluationAttributes {
  email: string;
  createdAt: string;
  updatedAt: string;
  dimensions: EvaluationDimensionModel[];
}

interface EvaluationDimensionModel {
  id: number;
  comment: string;
  quiz: QuizModel[];
}

interface QuizModel {
  id: number;
  answer: number;
}

interface Meta {}

export const getProgram = (programId: string): Promise<FinalProgramModel> => {
  const params = {
    populate: {
      mentors: {
        populate: ["dimensions", "mentorActivities"],
      },
      users: {
        populate: {
          reports: {
            populate: {
              evaluations: {
                populate: {
                  dimensions: {
                    populate: {
                      quiz: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return API.get<GetProgramResponse>(`api/programs/${programId}`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => ({
    ...res.data.data,
    ...res.data.data.attributes,
    mentors: res.data.data.attributes.mentors.data.map((m) => ({
      ...m,
      ...m.attributes,
      dimensions: m.attributes.dimensions.data.map((d) => ({
        ...d,
        ...d.attributes,
        quiz: [],
      })),
      mentorActivities: m.attributes.mentorActivities.data.map((a) => ({
        ...a,
        ...a.attributes,
      })),
    })),
    mentorsCount: res.data.data.attributes.mentors.data.length,
    users: res.data.data.attributes.users.data.map((u) => ({
      ...u,
      ...u.attributes,
      reports: u.attributes.reports.data.map((r) => ({
        ...r,
        ...r.attributes,
        evaluations: r.attributes.evaluations.data.map((e) => ({
          ...e,
          ...e.attributes,
          dimensions: e.attributes.dimensions.map((d) => ({
            ...d,
          })),
        })),
      })),
    })),
    usersCount: res.data.data.attributes.users.data.length,
  }));
};
