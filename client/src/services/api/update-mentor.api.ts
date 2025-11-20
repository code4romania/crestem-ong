import { API } from "../api";
export interface UpdateMentorRequest {
  id: number;

  firstName: string;
  lastName: string;
  dimensions: number[];
  mentorPrograms?: number[];
  bio: string;
  expertise?: string;
  available: boolean;
}

export const updateMentor = ({
  id,
  ...request
}: UpdateMentorRequest): Promise<void> => {
  return API.put<void>(`api/users/${id}`, request).then((res) => res.data);
};
