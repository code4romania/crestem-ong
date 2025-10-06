import { API } from "../api";
import type { ActivityTypeModel } from "./types";
interface ListDimensionsResponse {
  data: {
    id: number;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}
export const listActivityTypes = (): Promise<ActivityTypeModel[]> => {
  return API.get<ListDimensionsResponse>(`api/activity-types`).then((res) =>
    res.data.data?.map((at) => ({
      id: at.id,
      name: at.attributes.name,
      createdAt: at.attributes.createdAt,
      updatedAt: at.attributes.updatedAt,
    }))
  );
};
