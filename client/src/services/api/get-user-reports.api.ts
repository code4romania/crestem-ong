import qs from "qs";
import { API } from "../api";
import type { FinalReportModel } from "./types";

interface GetUserReports {
  reports: FinalReportModel[];
}

export const getUserReports = (): Promise<FinalReportModel[]> => {
  const params = {
    populate: ["reports.evaluations.dimensions.quiz"],
  };

  return API.get<GetUserReports>(`api/users/me`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data.reports ?? []);
};
