import qs from "qs";
import { API } from "../api";
import type { DimensionModel as ApiDimensionModel, MetaModel } from "./types";

export interface ListDimensionsResponse {
  data: ApiDimensionModel[];
  meta: MetaModel;
}

export const listDimensions = (): Promise<ListDimensionsResponse> => {
  const params = {
    pagination: {
      start: 0,
      limit: 100,
    },
  };
  return API.get<ListDimensionsResponse>(`api/domains`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
