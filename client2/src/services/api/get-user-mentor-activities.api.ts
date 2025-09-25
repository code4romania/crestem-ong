import qs from "qs";
import { API } from "../api";
import type { MentorActivityModel } from "./types";

export const getUserMentorActivities = (): Promise<MentorActivityModel[]> => {
  const params = {
    populate: ["mentorActivities.dimension", "mentorActivities.user"],
  };

  return API.get<{
    mentorActivities: MentorActivityModel[];
  }>(`api/users/me`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data.mentorActivities);
};
