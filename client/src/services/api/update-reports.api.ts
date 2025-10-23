import { API } from "../api";
export interface UpdateReportRequest {
  id: number;
  deadline: string;
  finished?: boolean;
}
export const updateReport = ({
  id,
  ...request
}: UpdateReportRequest): Promise<void> => {
  return API.put(`api/reports/${id}`, {
    data: request,
  }).then((res) => res.data);
};
