import qs from "qs";
import { API } from "../api";

export const listMentees = (userId: number): Promise<any> => {
  const params = {
    filters: {
      mentor: {
        id: {
          $eq: userId,
        },
      },
    },
    populate: {
      mentorshipRequests: {
        populate: ["user"],
      },
    },
  };

  return API.get<{
    mentorshipRequests: any[];
  }>(`api/mentorship-requests`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => res.data ?? []);
};
