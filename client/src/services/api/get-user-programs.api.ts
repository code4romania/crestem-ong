import qs from "qs";
import { API } from "../api";
import type { FinalProgramModel } from "./types";

export const getUserPrograms = (): Promise<FinalProgramModel[]> => {
  const params = {
    populate: ["mentorPrograms.program", "ngoPrograms.program"],
  };

  return API.get<{
    mentorPrograms: FinalProgramModel[];
    ngoPrograms: FinalProgramModel[];
  }>(`api/users/me`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data.mentorPrograms ?? res.data.ngoPrograms ?? []);
};
