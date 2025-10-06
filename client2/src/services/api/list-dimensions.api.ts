import { API } from "../api";
import type { DimensionModel as ApiDimensionModel } from "./types";
export interface ListDimensionsResponse {
  data: ApiDimensionModel[];
}
export const listDimensions = (): Promise<ApiDimensionModel[]> => {
  return API.get<ListDimensionsResponse>(`api/dimensions`).then(
    (res) => res.data.data
  );
};
