import { API } from "../api";
export const deleteActivity = (id: number): Promise<void> => {
  return API.delete<void>(`api/activities/${id}`).then((res) => res.data);
};
