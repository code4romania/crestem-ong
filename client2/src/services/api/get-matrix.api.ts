import qs from "qs";
import { API } from "../api";
import type { FinalMatrixModel } from "./types";

interface GetMatrixApiResponse {
  data: MatrixModel;
  meta: Meta;
}

interface MatrixModel {
  id: number;
  attributes: MatrixAttributes;
}

interface MatrixAttributes {
  createdAt: string;
  updatedAt: string;
  dimensions: DimensionsData;
}

interface DimensionsData {
  data: DimensionModel[];
}

interface DimensionModel {
  id: number;
  attributes: DimensionAttributes;
}

interface DimensionAttributes {
  name: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  quiz: QuizModel[];
}

interface QuizModel {
  id: number;
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  option_5: string;
  tag: string;
}

interface Meta {}

export const getMatrix = (): Promise<FinalMatrixModel> => {
  const params = {
    populate: {
      dimensions: {
        populate: ["quiz"],
      },
    },
  };

  return API.get<GetMatrixApiResponse>(`api/matrix`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => ({
    ...res.data.data,
    ...res.data.data.attributes,
    dimensions: res.data.data.attributes.dimensions.data.map((d) => ({
      ...d,
      ...d.attributes,
    })),
  }));
};
