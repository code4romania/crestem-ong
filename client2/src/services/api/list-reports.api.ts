import qs from "qs";
import { API } from "../api";
import type { FinalReportModel, PaginationRequest } from "./types";

export interface ListReportsResponse {
  data: FinalReportModel[];
  meta: Meta;
}

interface ListReportsApiResponse {
  data: ReportModel[];
  meta: Meta;
}

interface ReportModel {
  id: number;
  attributes: ReportModelAttributes;
}

interface ReportModelAttributes {
  deadline: string;
  finished: boolean;
  createdAt: string;
  updatedAt: string;
  evaluations: EvaluationsDataModel;
  user: UserDataModel;
}

interface UserDataModel {
  data: UseModel;
}

interface UseModel {
  id: number;
  attributes: DataAttributes;
}

interface DataAttributes {
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
  accountTwitter: string | undefined;
  accountTiktok: string | undefined;
  accountInstagram: string | undefined | string;
  accountLinkedin: string | undefined;
  createdAt: string;
  updatedAt: string;
  bio: string | undefined;
  expertise: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  available: boolean;
}

interface EvaluationsDataModel {
  data: EvaluationModel[];
}

interface EvaluationModel {
  id: number;
  attributes: EvaluationModelAttributes;
}

interface EvaluationModelAttributes {
  email: string;
  createdAt: string;
  updatedAt: string;
  dimensions: DimensionModel[];
}

interface DimensionModel {
  id: number;
  comment: string;
  quiz: QuizModel[];
}

interface QuizModel {
  id: number;
  answer: number;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export const listReports = (): Promise<ListReportsResponse> => {
  const params = {
    populate: ["evaluations.dimensions.quiz", "user"],
    pagination: {
      page: 1,
      pageSize: 1000,
    },
    sort: "createdAt:desc",
  };

  return API.get<ListReportsApiResponse>(`api/reports`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => ({
    ...res.data,
    data: res.data.data.map((r) => ({
      ...r,
      ...r.attributes,
      evaluations: r.attributes.evaluations.data.map((e) => ({
        ...e,
        ...e.attributes,
      })),
      user: {
        ...r.attributes.user.data,
        ...r.attributes.user.data?.attributes,
      },
    })),
  }));
};
