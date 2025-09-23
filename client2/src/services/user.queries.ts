import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getMe, type MeModel } from "./api/get-me.api";
import Cookies from "js-cookie";

export const getMeQueryOptions = <TResult = MeModel>(
  select?: (data: MeModel) => TResult
) =>
  queryOptions({
    queryKey: ["me"],
    queryFn: getMe,
    select,
  });

export const useSuspenseGetMe = <TResult = MeModel>(
  select?: (data: MeModel) => TResult
) => useSuspenseQuery(getMeQueryOptions(select));

export const useGetMe = <TResult = MeModel>(
  select?: (data: MeModel) => TResult
) => useQuery(getMeQueryOptions(select));

export const getTokenQueryOptions = <TResult = string | undefined>(
  select?: (data: string | undefined) => TResult
) =>
  queryOptions({
    queryKey: ["me", "token"],
    queryFn: () => Cookies.get("jwt"),
    select,
  });

export const useGetToken = <TResult = string | undefined>(
  select?: (data: string | undefined) => TResult
) => useQuery(getTokenQueryOptions(select));
