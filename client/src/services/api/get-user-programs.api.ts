import qs from "qs";
import { API } from "../api";
import type { ProgramFinalModel } from "./types";

export const getUserPrograms = (): Promise<ProgramFinalModel[]> => {
  const params = {
    populate: ["program", "programs.users"],
  };

  return API.get<{
    programs: ProgramFinalModel[];
  }>(`api/users/me`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data.programs);
};
