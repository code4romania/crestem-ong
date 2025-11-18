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
  programMentors: {
    data: any[];
  };

  programNgos: {
    data: any[];
  };

  mentorsCount: number | undefined;

  usersCount: number | undefined;
}

interface ListProgramsResponse {
  data: ProgramModel[];
}
export const listPrograms = (): Promise<FinalProgramModel[]> => {
  const params = {
    populate: ["programMentors", "programNgos"],
  };

  return API.get<ListProgramsResponse>(`/api/programs`, {
    params,
    paramsSerializer: {
      serialize: (params) =>
        qs.stringify(params, {
          encodeValuesOnly: true,
        }),
    },
  }).then((res) => {
    const result = res.data;
    return (
      result.data.map((p) => {
        const attributes = p.attributes || {};

        // flatten ngos and mentors arrays
        const ngos = (attributes.programNgos?.data || []).map((r: any) => ({
          id: r.id,
          addedAt: r.attributes?.createdAt,
          ngo: r.attributes?.ngo?.data
            ? r.attributes.ngo.data.attributes
            : undefined,
        }));

        const mentors = (attributes.programMentors?.data || []).map(
          (r: any) => ({
            id: r.id,
            addedAt: r.attributes?.createdAt,
            mentor: r.attributes?.mentor?.data
              ? r.attributes.mentor.data.attributes
              : undefined,
          })
        );

        return {
          id: p.id,
          ...attributes,
          ngosInProgram: ngos,
          mentorsInProgram: mentors,
          users: [],
          mentors: [],
          usersCount: attributes.programNgos?.data?.length ?? 0,
          mentorsCount: attributes.programMentors?.data?.length ?? 0,
        };
      }) ?? []
    );
  });
};
