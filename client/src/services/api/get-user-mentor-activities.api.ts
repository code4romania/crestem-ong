import qs from "qs";
import { API } from "../api";
import type { MentorActivityModel } from "./types";

export const getUserMentorActivities = (
  userId: number
): Promise<MentorActivityModel[]> => {
  const params = {
    populate: {
      mentorActivities: {
        populate: ["dimension", "user", "type"],
      },
    },
  };

  return API.get<{
    mentorActivities: MentorActivityModel[];
  }>(`api/users/${userId}`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data.mentorActivities ?? []);
};
