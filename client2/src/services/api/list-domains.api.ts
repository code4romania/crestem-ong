import qs from "qs";
import API from "../api";
import type { DomainModel as ApiDomainModel, MetaModel } from "./types";

export interface DomainModel {
  id: number;
  name: string;
}

interface ListDomainsResponse {
  data: ApiDomainModel[];
  meta: MetaModel;
}

export const listDomains = (): Promise<DomainModel[]> => {
  const params = {
    pagination: {
      start: 0,
      limit: 100,
    },
  };
  return API.get<ListDomainsResponse>(`api/domains`, {
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
