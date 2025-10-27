import { API } from "../api";

export interface CreateProgramResponse {
  data: {
    id: number;
  };
}
export const createProgram = (data: {
  name: string;
  description: string;
  sponsorName: string | undefined;
  startDate: string;
  endDate: string;
}): Promise<CreateProgramResponse> => {
  return API.post<CreateProgramResponse>(`api/programs`, {
    data,
  }).then((res) => res.data);
};
