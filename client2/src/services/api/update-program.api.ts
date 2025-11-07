import { API } from "../api";

export const updateProgram = ({
  programId,
  ngoIds,
  mentorIds,
}: {
  programId: string;
  ngoIds?: number[];
  mentorIds?: number[];
}): Promise<void> => {
  return API.put<void>(`api/programs/${programId}`, {
    data: {
      users: ngoIds,
      mentors: mentorIds,
    },
  }).then((res) => res.data);
};
