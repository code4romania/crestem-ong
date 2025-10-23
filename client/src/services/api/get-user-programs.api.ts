import qs from "qs";
import { API } from "../api";
import type { FinalProgramModel } from "./types";

export const getUserPrograms = (): Promise<FinalProgramModel[]> => {
  const params = {
    populate: ["program", "programs.users"],
  };

  return API.get<{
    programs: FinalProgramModel[];
  }>(`api/users/me`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data.programs ?? []);
};
