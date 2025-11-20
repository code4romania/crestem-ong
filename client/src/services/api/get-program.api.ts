import qs from "qs";
import { API } from "../api";
import type { FinalProgramModel, FinalUserModel } from "./types";

export type Root = {
  data: {
    id: number;
    attributes: {
      name: string;
      startDate: string;
      endDate: string;
      sponsorName: any;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      programMentors: {
        data: Array<{
          id: number;
          attributes: {
            createdAt: string;
            updatedAt: string;
            mentor: {
              data: {
                id: number;
                attributes: {
                  username: string;
                  email: string;
                  provider: string;
                  confirmed: boolean;
                  blocked: boolean;
                  ongName: string;
                  ongIdentificationNumber: string;
                  county: any;
                  city: any;
                  phone: any;
                  website: any;
                  keywords: any;
                  description: any;
                  contactFirstName: any;
                  contactLastName: any;
                  contactEmail: string;
                  contactPhone: any;
                  accountFacebook: any;
                  accountTwitter: any;
                  accountTiktok: any;
                  accountInstagram: any;
                  accountLinkedin: any;
                  bio: any;
                  expertise: any;
                  firstName: any;
                  lastName: any;
                  available: boolean;
                  createdAt: string;
                  updatedAt: string;
                  mentorActivities: {
                    data: Array<any>;
                  };
                  dimensions: {
                    data: Array<any>;
                  };
                };
              };
            };
          };
        }>;
      };
      programNgos: {
        data: Array<any>;
      };
    };
  };
};

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
  programMentors: MentorsData;
  programNgos: UsersData;
}

interface MentorsData {
  data: Array<{
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      mentor: { data: ProgramMentorModel };
    };
  }>;
}

interface ProgramMentorModel {
  id: number;
  attributes: MentorAttributes;
}

interface MentorAttributes {
  //id: number;
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
  data: Array<{
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      ngo: { data: UserModel };
    };
  }>;
}

interface UserModel {
  id: number;
  attributes: UserAttributes;
}

interface UserAttributes {
  //id: number;
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
      programMentors: {
        populate: ["mentor", "mentor.dimensions", "mentor.mentorActivities"],
      },
      programNgos: {
        populate: [
          "ngo",
          "ngo.reports",
          "ngo.reports.evaluations",
          "ngo.reports.evaluations.dimensions",
          "ngo.reports.evaluations.dimensions.quiz",
        ],
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
  }).then(
    (res): FinalProgramModel => ({
      ...res.data.data,
      ...res.data.data.attributes,
      mentors: res.data.data.attributes.programMentors.data.map(
        (m): FinalUserModel => ({
          id: m.attributes.mentor.data.id,
          ...m.attributes.mentor.data.attributes,
          programJoinedAt: m.attributes.createdAt,

          dimensions: m.attributes.mentor.data.attributes.dimensions.data.map(
            (d) => ({
              ...d,
              ...d.attributes,
              quiz: [],
            })
          ),
          mentorActivities:
            m.attributes.mentor.data.attributes.mentorActivities.data.map(
              (a) => ({
                ...a,
                ...a.attributes,
              })
            ),
        })
      ),
      mentorsCount: res.data.data.attributes.programMentors.data.length,
      users: res.data.data.attributes.programNgos.data.map(
        (u): FinalUserModel => ({
          id: u.attributes.ngo.data.id,
          ...u.attributes.ngo.data.attributes,
          programJoinedAt: u.attributes.createdAt,
          reports: u.attributes.ngo.data.attributes.reports.data.map((r) => ({
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
        })
      ),
      usersCount: res.data.data.attributes.programNgos.data.length,
    })
  );
};
