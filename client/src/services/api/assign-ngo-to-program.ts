import { API } from "../api";

export const assignNgoToProgram = ({
  programId,
  ngoId,
}: {
  programId: string;
  ngoId: number;
}): Promise<void> => {
  return API.post(`api/ngo-programs`, {
    data: {
      ngo: ngoId,
      program: programId,
    },
  }).then((res) => res.data);
};
