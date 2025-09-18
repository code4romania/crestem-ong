import { API } from "../api";
import type { DimensionModel as ApiDimensionModel } from "./types";

export const listDimensions = (): Promise<ApiDimensionModel[]> => {
  return API.get<ApiDimensionModel[]>(`api/domains`).then((res) => res.data);
};
