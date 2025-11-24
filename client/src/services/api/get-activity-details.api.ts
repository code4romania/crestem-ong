import qs from "qs";
import { API } from "../api";
import type { MentorActivityModel } from "./types";

export const getActivityDetails = (
  activityId: string
): Promise<MentorActivityModel> => {
  const params = {
    populate: ["dimension", "type", "user", "mentor"],
  };

  return API.get<MentorActivityModel>(`api/activities/${activityId}`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
