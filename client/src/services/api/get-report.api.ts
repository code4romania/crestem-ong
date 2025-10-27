import { API } from "../api";
import type { FinalReportModel } from "./types";

interface GetReportResponse {
  id: number;
  deadline: string;
  finished: boolean;
  createdAt: string;
  updatedAt: string;
  evaluations: EvaluationModel[];
  user: UserModel;
}

interface EvaluationModel {
  id: number;
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

interface UserModel {
  id: number;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken: string;
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
  accountTwitter: string;
  accountTiktok: string;
  accountInstagram: string;
  accountLinkedin: string;
  createdAt: string;
  updatedAt: string;
  registrationToken: string;
  bio: string;
  expertise: string;
  firstName: string;
  lastName: string;
  available: boolean;
}

export const getReport = (reportId: string): Promise<FinalReportModel> => {
  return API.get<GetReportResponse>(`api/reports/${reportId}`).then(
    (res) => res.data
  );
};
