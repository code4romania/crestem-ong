import { API } from "../api";
import type { DimensionModel as ApiDimensionModel } from "./types";

interface DimensionModel {
  id: number;
  attributes: DimensionAttributes;
}

interface DimensionAttributes {
  name: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

interface ListDimensionsResponse {
  data: DimensionModel[];
}
export const listDimensions = (): Promise<ApiDimensionModel[]> => {
  return API.get<ListDimensionsResponse>(`api/dimensions`).then(
    (res) =>
      res.data.data
        ?.map((d) => ({ ...d, ...d.attributes }))
        .sort((a, b) => a.id - b.id) ?? []
  );
};
