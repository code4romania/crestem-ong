import qs from "qs";
import API from "../api";

export interface DomainModel {
  id: number;
  name: string;
}

interface GetDomainsResponse {
  data: Domain[];
  meta: Meta;
}

interface Domain {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export const getDomains = (): Promise<DomainModel[]> => {
  const params = {
    pagination: {
      start: 0,
      limit: 100,
    },
  };
  return API.get<GetDomainsResponse>(`api/domains`, {
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
