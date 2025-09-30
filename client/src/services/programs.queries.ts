import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getProgram, type ProgramModel } from "./api/get-program.api";
import { listPrograms } from "./api/list-programs.api";
import type { ProgramModel as ApiProgramModel } from "./api/types";

export const listProgramsQueryOptions = <TResult = ApiProgramModel[]>(
  select?: (data: ApiProgramModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["programs"],
    queryFn: listPrograms,
    select,
  });

export const useSuspenseListPrograms = <TResult = ApiProgramModel[]>(
  select?: (data: ApiProgramModel[]) => TResult
) => useSuspenseQuery(listProgramsQueryOptions(select));

export const useListPrograms = <TResult = ApiProgramModel[]>(
  select?: (data: ApiProgramModel[]) => TResult
) => useQuery(listProgramsQueryOptions(select));

export const getProgramQueryOptions = <TResult = ProgramModel>(
  programId: string,
  select?: (data: ProgramModel) => TResult
) =>
  queryOptions({
    queryKey: ["programs", programId],
    queryFn: () => getProgram(programId),
    select,
  });

export const useGetProgram = <TResult = ProgramModel>(
  programId: string,
  select?: (data: ProgramModel) => TResult
) => useQuery(getProgramQueryOptions(programId, select));

export const useSuspenseGetProgram = <TResult = ProgramModel>(
  programId: string,
  select?: (data: ProgramModel) => TResult
) => useSuspenseQuery(getProgramQueryOptions(programId, select));
