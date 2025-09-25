import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getMe, type MeModel } from "./api/get-me.api";
import Cookies from "js-cookie";
import { getRegistrationInfo } from "./api/get-registration-info.api";
import { getUserDomains } from "./api/get-user-domains.api";
import { getUserMentorActivities } from "./api/get-user-mentor-activities.api";
import type { MentorActivityModel, ProgramFinalModel } from "./api/types";
import { getUserPrograms } from "./api/get-user-programs.api";

export const getMeQueryOptions = <TResult = MeModel>(
  select?: (data: MeModel) => TResult
) =>
  queryOptions({
    queryKey: ["me"],
    queryFn: getMe,
    select,
    enabled: () => !!Cookies.get("jwt"),
  });

export const useSuspenseGetMe = <TResult = MeModel>(
  select?: (data: MeModel) => TResult
) => useSuspenseQuery(getMeQueryOptions(select));

export const useGetMe = <TResult = MeModel>(
  select?: (data: MeModel) => TResult
) => useQuery(getMeQueryOptions(select));

export const getTokenQueryOptions = <TResult = string | null>(
  select?: (data: string | null) => TResult
) =>
  queryOptions({
    queryKey: ["me", "token"],
    queryFn: () => Cookies.get("jwt") ?? null,
    select,
    enabled: !!Cookies.get("jwt"),
  });

export const useGetToken = <TResult = string | null>(
  select?: (data: string | null) => TResult
) => useQuery(getTokenQueryOptions(select));

export const getRegistrationInfoQueryOptions = (registrationToken: string) =>
  queryOptions({
    queryKey: ["registration-info", registrationToken],
    queryFn: () => getRegistrationInfo(registrationToken),
  });

export const useGetRegistrationInfo = (registrationToken: string) =>
  useQuery(getRegistrationInfoQueryOptions(registrationToken));

export const getUserDomainsQueryOptions = queryOptions({
  queryKey: ["me", "domains"],
  queryFn: getUserDomains,
  enabled: !!Cookies.get("jwt"),
});

export const useGetUserDomains = () => useQuery(getUserDomainsQueryOptions);

export const getUserMentorActivitiesQueryOptions = <
  TResult = MentorActivityModel[]
>(
  select?: (data: MentorActivityModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["me", "mentor-activities"],
    queryFn: getUserMentorActivities,
    placeholderData: [],
    select,
    enabled: !!Cookies.get("jwt"),
  });

export const useGetUserMentorActivities = <TResult = MentorActivityModel[]>(
  select?: (data: MentorActivityModel[]) => TResult
) => useQuery(getUserMentorActivitiesQueryOptions(select));

export const getUserProgramsQueryOptions = <TResult = ProgramFinalModel[]>(
  select?: (data: ProgramFinalModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["me", "programs"],
    queryFn: getUserPrograms,
    placeholderData: [],
    select,
    enabled: !!Cookies.get("jwt"),
  });

export const useGetUserPrograms = <TResult = ProgramFinalModel[]>(
  select?: (data: ProgramFinalModel[]) => TResult
) => useQuery(getUserProgramsQueryOptions(select));
