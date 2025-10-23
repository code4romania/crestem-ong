import { API } from "../api";

export interface CreateActivityRequest {
  user: string;
  dimension: string;
  startDate: string;
  type: string;
  duration: number;
  notes: string;
  mentor: number;
}
export interface CreateActivityResponse {}

export const createActivity = (
  request: CreateActivityRequest
): Promise<CreateActivityResponse> => {
  return API.post<CreateActivityResponse>(`api/activities`, {
    data: request,
  }).then((res) => res.data);
};
