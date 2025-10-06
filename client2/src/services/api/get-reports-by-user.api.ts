import qs from "qs";
import { API } from "../api";
import type { FinalReportModel } from "./types";

export const getReportsByUser = (
  userId: string
): Promise<FinalReportModel[]> => {
  const params = {
    populate: {
      dimensions: {
        populate: ["quiz"],
      },
    },
  };

  return API.get<any>(`benis`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
