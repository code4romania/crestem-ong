import qs from "qs";
import { API } from "../api";
import type { FinalDomainModel, MetaModel } from "./types";

interface DomainModel {
  id: number;
  attributes: DomainAtrributeModel;
}

interface DomainAtrributeModel {
  name: string;
}

interface ListDomainsResponse {
  data: DomainModel[];
  meta: MetaModel;
}

export const listDomains = (): Promise<FinalDomainModel[]> => {
  const params = {
    pagination: {
      start: 0,
      limit: 1000,
    },
  };
  return API.get<ListDomainsResponse>(`api/domains`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then(
    (res) =>
      res.data.data.map((d) => ({ id: d.id, name: d.attributes.name })) ?? []
  );
};
