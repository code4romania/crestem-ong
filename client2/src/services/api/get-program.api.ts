import qs from "qs";
import { API } from "../api";
export interface GetProgramResponse {
  data: ProgramModel;
  meta: Meta;
}

export interface ProgramModel {
  id: number;
  attributes: ProgramAttributes;
}

export interface ProgramAttributes {
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

export interface MentorsData {
  data: ProgramMentorModel[];
}

export interface ProgramMentorModel {
  id: number;
  attributes: MentorAttributes;
}

export interface MentorAttributes {
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
  accountFacebook: any;
  accountTwitter: any;
  accountTiktok: any;
  accountInstagram: any;
  accountLinkedin: any;
  createdAt: string;
  updatedAt: string;
  bio: string;
  expertise: string;
  firstName: string;
  lastName: string;
  available: boolean;
  dimensions: DimensionsData;
  mentorActivities: MentorActivitiesData;
}

export interface DimensionsData {
  data: DimensionModel[];
}

export interface DimensionModel {
  id: number;
  attributes: DimensionAttributes;
}

export interface DimensionAttributes {
  name: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

export interface MentorActivitiesData {
  data: any[];
}

export interface UsersData {
  data: UserModel[];
}

export interface UserModel {
  id: number;
  attributes: UserAttributes;
}

export interface UserAttributes {
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
  accountFacebook: string;
  accountTwitter?: string;
  accountTiktok: any;
  accountInstagram?: string;
  accountLinkedin: any;
  createdAt: string;
  updatedAt: string;
  bio: any;
  expertise: any;
  firstName: any;
  lastName: any;
  available: boolean;
  reports: ReportsData;
}

export interface ReportsData {
  data: ReportModel[];
}

export interface ReportModel {
  id: number;
  attributes: ReportAttributes;
}

export interface ReportAttributes {
  deadline: string;
  finished: boolean;
  createdAt: string;
  updatedAt: string;
  evaluations: EvaluationsData;
}

export interface EvaluationsData {
  data: EvaluationModel[];
}

export interface EvaluationModel {
  id: number;
  attributes: EvaluationAttributes;
}

export interface EvaluationAttributes {
  email: string;
  createdAt: string;
  updatedAt: string;
  dimensions: DimensionModel[];
}

export interface DimensionModel {
  id: number;
  comment: string;
  quiz: QuizModel[];
}

export interface QuizModel {
  id: number;
  answer: number;
}

export interface Meta {}

export const getProgram = (programId: string): Promise<ProgramModel> => {
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
  }).then((res) => res.data.data);
};
