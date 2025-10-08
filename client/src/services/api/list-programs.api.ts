import qs from "qs";
import { API } from "../api";
import type { FinalProgramModel } from "./types";

interface ProgramModel {
  id: number;
  attributes: ProgramAttributesModel;
}

interface ProgramAttributesModel {
  name: string;
  startDate: string;
  endDate: string;
  sponsorName?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Temoprary fix until we upgrade to strapi v5
  // This is used just to get the count of mentors
  mentors?: {
    data: any[];
  };
  mentorsCount: number | undefined;

  // Temoprary fix until we upgrade to strapi v5
  // This is used just to get the count of users
  users?: {
    data: any[];
  };

  usersCount: number | undefined;
}

interface ListProgramsResponse {
  data: ProgramModel[];
}
export const listPrograms = (): Promise<FinalProgramModel[]> => {
  const params = {
    populate: {
      mentors: {
        fields: ["id"],
      },
      users: {
        fields: ["id"],
      },
    },
  };

  return API.get<ListProgramsResponse>(`api/programs`, {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { encodeValuesOnly: true });
      },
    },
  }).then((res) => {
    const result = res.data;
    return (
      result.data.map((p) => ({
        ...p,
        ...p.attributes,
        users: [],
        mentors: [],
        usersCount: p.attributes.users?.data?.length,
        mentorsCount: p.attributes.mentors?.data?.length,
      })) ?? []
    );
  });
};
