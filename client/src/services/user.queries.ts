import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getMe, type MeModel } from "./api/get-me.api";
import { getUserMentorActivities } from "./api/get-my-mentor-activities.api";
import { getRegistrationInfo } from "./api/get-registration-info.api";
import { getUserDetails } from "./api/get-user-details.api";
import { getUserDimensions } from "./api/get-user-dimensions.api";
import { getUserDomains } from "./api/get-user-domains.api";
import { getUserPrograms } from "./api/get-user-programs.api";
import { listMentees } from "./api/list-mentees.api";
import type {
  FinalDetailedUserModel,
  FinalDimensionModel,
  FinalDomainModel,
  FinalProgramModel,
  FinalUserModel,
  MentorActivityModel,
} from "./api/types";

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

export const getUserDomainsQueryOptions = <TResult = FinalDomainModel[]>(
  select?: (data: FinalDomainModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["me", "domains"],
    queryFn: getUserDomains,
    enabled: !!Cookies.get("jwt"),
    select,
  });

export const useGetUserDomains = <TResult = FinalDomainModel[]>(
  select?: (data: FinalDomainModel[]) => TResult
) => useQuery(getUserDomainsQueryOptions(select));

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

export const getUserProgramsQueryOptions = <TResult = FinalProgramModel[]>(
  select?: (data: FinalProgramModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["me", "programs"],
    queryFn: getUserPrograms,
    placeholderData: [],
    select,
    enabled: !!Cookies.get("jwt"),
  });

export const useGetUserPrograms = <TResult = FinalProgramModel[]>(
  select?: (data: FinalProgramModel[]) => TResult
) => useQuery(getUserProgramsQueryOptions(select));

export const getUserDimensionsQueryOptions = <TResult = FinalDimensionModel[]>(
  select?: (data: FinalDimensionModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["me", "dimensions"],
    queryFn: getUserDimensions,
    enabled: !!Cookies.get("jwt"),
    select,
  });

export const useGetUserDimensions = <TResult = FinalDimensionModel[]>(
  select?: (data: FinalDimensionModel[]) => TResult
) => useQuery(getUserDimensionsQueryOptions(select));

export const getUserDetailsQueryOptions = <TResult = FinalDetailedUserModel>(
  userId: string,
  select?: (data: FinalDetailedUserModel) => TResult
) =>
  queryOptions({
    queryKey: ["users-detailed", userId],
    queryFn: () => getUserDetails(userId),
    select,
  });

export const useSuspenseGetUserDetails = <TResult = FinalDetailedUserModel>(
  userId: string,
  select?: (data: FinalDetailedUserModel) => TResult
) => useSuspenseQuery(getUserDetailsQueryOptions(userId, select));

export const useGetUserDetails = <TResult = FinalDetailedUserModel>(
  userId: string,
  select?: (data: FinalDetailedUserModel) => TResult
) => useQuery(getUserDetailsQueryOptions(userId, select));

export const listMenteesQueryOptions = <TResult = FinalUserModel[]>(
  mentorId: number,
  select?: (data: FinalUserModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["mentees"],
    queryFn: () => listMentees(mentorId),
    placeholderData: [],
    select,
    enabled: !!Cookies.get("jwt"),
  });

export const useListMentees = <TResult = FinalUserModel[]>(
  mentorId: number,
  select?: (data: FinalUserModel[]) => TResult
) => useQuery(listMenteesQueryOptions(mentorId, select));
