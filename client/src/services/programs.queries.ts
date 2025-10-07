import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getProgram } from "./api/get-program.api";
import { listPrograms } from "./api/list-programs.api";
import type {
  ProgramModel as ApiProgramModel,
  FinalProgramModel,
} from "./api/types";

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

export const getProgramQueryOptions = <TResult = FinalProgramModel>(
  programId: string,
  select?: (data: FinalProgramModel) => TResult
) =>
  queryOptions({
    queryKey: ["programs", programId],
    queryFn: () => getProgram(programId),
    select,
  });

export const useGetProgram = <TResult = FinalProgramModel>(
  programId: string,
  select?: (data: FinalProgramModel) => TResult
) => useQuery(getProgramQueryOptions(programId, select));

export const useSuspenseGetProgram = <TResult = FinalProgramModel>(
  programId: string,
  select?: (data: FinalProgramModel) => TResult
) => useSuspenseQuery(getProgramQueryOptions(programId, select));
