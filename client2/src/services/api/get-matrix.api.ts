import qs from "qs";
import { API } from "../api";

export interface GetMatrixResponse {
  data: MatrixModel;
  meta: Meta;
}

export interface MatrixModel {
  id: number;
  attributes: MatrixAttributes;
}

export interface MatrixAttributes {
  createdAt: string;
  updatedAt: string;
  dimensions: DimensionsData;
}

export interface DimensionsData {
  data: DimensionModel[];
}

export interface DimensionModel {
  id: number;
  attributes: DimensionAttributes;
}

export interface DimensionAttributes {
  name: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  quiz: QuizModel[];
}

export interface QuizModel {
  id: number;
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  option_5: string;
  tag: string;
}

export interface Meta {}

export const getMatrix = (): Promise<MatrixModel> => {
  const params = {
    populate: {
      dimensions: {
        populate: ["quiz"],
      },
    },
  };

  return API.get<GetMatrixResponse>(`api/matrix`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data.data);
};
