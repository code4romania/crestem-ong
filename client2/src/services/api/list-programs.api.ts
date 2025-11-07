import qs from "qs";
import { API } from "../api";
import type { ProgramModel as ApiProgramModel } from "./types";
export interface ListProgramsResponse {
  data: ApiProgramModel[];
}
export const listPrograms = (): Promise<ApiProgramModel[]> => {
  const params = {
    populate: {
      mentors: {
        fields: ["id"],
      },
      users: {
        fields: ["id"],
      },
    },
  };

  return API.get<ListProgramsResponse>(`api/programs`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => {
    const result = res.data;
    return result.data.map((p) => ({
      ...p,
      attributes: {
        ...p.attributes,
        usersCount: p.attributes.users?.data?.length,
        mentorsCount: p.attributes.mentors?.data?.length,
      },
    }));
  });
};
