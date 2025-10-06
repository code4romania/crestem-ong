import qs from "qs";
import { API } from "../api";
import type { DetailedNgoModel } from "./list-ngos.api";

export const getNgoDetails = (ngoId: string): Promise<DetailedNgoModel> => {
  const params = {
    populate: ["domains", "reports.evaluations.dimensions.quiz", "avatar"],
  };

  return API.get<DetailedNgoModel>(`api/users/${ngoId}`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
