import qs from "qs";
import { API } from "../api";
import type { MentorActivityModel } from "./types";

export const getNgoMentorActivities = (
  mentorId: number
): Promise<MentorActivityModel[]> => {
  const params = {
    populate: {
      userActivities: {
        populate: ["dimension", "mentor", "type", "activityType"],
      },
    },
  };

  return API.get<{
    userActivities: MentorActivityModel[];
  }>(`api/users/${mentorId}`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data.userActivities ?? []);
};
