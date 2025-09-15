import qs from "qs";
import API from "../api";
import type { MetaModel, ProgramModel as ApiProgramModel } from "./types";

export interface ProgramModel {
  id: number;
  name: string;
}

export interface ListProgramsResponse {
  data: ApiProgramModel[];
  meta: MetaModel;
}

export const listPrograms = (): Promise<ProgramModel[]> => {
  const params = {
    pagination: {
      page: 1,
      pageSize: 100,
    },
  };

  return API.get<ListProgramsResponse>(`api/programs`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) =>
    res.data.data.map((d) => ({ id: d.id, name: d.attributes.name }))
  );
};
