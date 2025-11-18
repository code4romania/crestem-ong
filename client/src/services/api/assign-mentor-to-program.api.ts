import { API } from "../api";

export const assignMentorToProgram = ({
  programId,
  mentorId,
}: {
  programId: string;
  mentorId: number;
}): Promise<void> => {
  return API.post(`api/mentor-programs`, {
    data: {
      mentor: mentorId,
      program: programId,
    },
  }).then((res) => res.data);
};
