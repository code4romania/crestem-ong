import qs from "qs";
import { API } from "../api";
import type {
  FinalEvaluationDimensionModel,
  FinalEvaluationModel,
} from "./types";

export interface ListReportsResponse {
  data: FinalEvaluationModel[];
  meta: Meta;
}

interface EvaluationModel {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  email: string;
  createdAt: string;
  updatedAt: string;
  dimensions: FinalEvaluationDimensionModel[];
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

export const listEvaluations = (): Promise<ListReportsResponse> => {
  const params = {
    populate: "dimensions.quiz",
    pagination: {
      start: 0,
      limit: 1000,
    },
  };

  return API.get<{
    data: EvaluationModel[];
    meta: Meta;
  }>(`api/evaluations`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => ({
    meta: res.data.meta,
    data: res.data.data.map((e) => ({ ...e, ...e.attributes })),
  }));
};
