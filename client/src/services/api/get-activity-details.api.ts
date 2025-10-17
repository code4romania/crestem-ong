import qs from "qs";
import { API } from "../api";
import type {
  ActivityTypeModel,
  FinalDimensionModel,
  FinalUserModel,
  MentorActivityModel,
} from "./types";

interface ActivityDetailsResponse {
  id: number;
  startDate: string;
  notes: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  dimension: FinalDimensionModel;
  type: ActivityTypeModel;
  user: FinalUserModel;
  mentor: FinalUserModel;
}

export const getActivityDetails = (
  activityId: string
): Promise<MentorActivityModel> => {
  const params = {
    populate: ["dimension", "type", "user", "mentor"],
  };

  return API.get<ActivityDetailsResponse>(`api/activities/${activityId}`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
