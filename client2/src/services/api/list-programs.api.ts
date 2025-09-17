import qs from "qs";
import { API } from "../api";
import type {
  MetaModel,
  ProgramModel as ApiProgramModel,
  PaginationRequest,
} from "./types";

export interface ListProgramsResponse {
  data: ApiProgramModel[];
  meta: MetaModel;
}

export const listPrograms = (
  filters?: {
    search?: string;
    startDate?: string;
    endDate?: string;
  } & PaginationRequest
): Promise<ListProgramsResponse> => {
  const params = {
    filters: {
      name: {
        $contains: filters?.search,
      },
      startDate: {
        $ge: filters?.startDate,
      },
      endDate: {
        $le: filters?.endDate,
      },
    },
    populate: {
      mentors: {
        fields: ["id"],
      },
      users: {
        fields: ["id"],
      },
    },
    pagination: {
      page: filters?.page ?? 1,
      pageSize: filters?.pageSize ?? 25,
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
    return {
      meta: result.meta,
      data: result.data.map((p) => ({
        ...p,
        attributes: {
          ...p.attributes,
          usersCount: p.attributes.users?.data?.length,
          mentorsCount: p.attributes.mentors?.data?.length,
        },
      })),
    };
  });
};
