import qs from "qs";
import { API } from "../api";
import type { MentorshipRelationModel } from "./types";

export const listMentorshipRelations = (): Promise<
  MentorshipRelationModel[]
> => {
  const params = {
    populate: ["user", "mentor"],
    pagination: {
      page: 1,
      pageSize: 100,
    },
  };

  return API.get<MentorshipRelationModel[]>(`api/mentorship-requests`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data);
};
