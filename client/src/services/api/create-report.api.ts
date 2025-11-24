import { API } from "../api";
export interface CreateReportRequest {
  evaluations: { email: string }[];
  deadline: string;
}
export interface CreateReportResponse {
  id: number;
}
export const createReport = (
  request: CreateReportRequest
): Promise<CreateReportResponse> => {
  return API.post<CreateReportResponse>(`api/reports`, {
    data: request,
  }).then((res) => res.data);
};
