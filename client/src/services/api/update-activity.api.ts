import { API } from "../api";

export interface UpdateActivityRequest {
  id: string;
  user: string;
  dimension: string;
  startDate: string;
  type: string;
  duration: string;
  notes: string;
  mentor: number;
}

export const updateActivity = (
  request: UpdateActivityRequest
): Promise<void> => {
  return API.put<void>(`api/activities/${request.id}`, {
    data: request,
  }).then((res) => res.data);
};
