import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getReport } from "./api/get-report.api";
import { getUserReports } from "./api/get-user-reports.api";
import { listReports, type ListReportsResponse } from "./api/list-reports.api";
import type { FinalReportModel } from "./api/types";

export const listReportsQueryOptions = <TResult = ListReportsResponse>(
  select?: (data: ListReportsResponse) => TResult
) =>
  queryOptions({
    queryKey: ["reports"],
    queryFn: listReports,
    select,
  });

export const useSuspenseListReports = <TResult = ListReportsResponse>(
  select?: (data: ListReportsResponse) => TResult
) => useSuspenseQuery(listReportsQueryOptions(select));

export const useListReports = <TResult = ListReportsResponse>(
  select?: (data: ListReportsResponse) => TResult
) => useQuery(listReportsQueryOptions(select));

export const getReportByIdQueryOptions = <TResult = FinalReportModel>(
  reportId: string,
  select?: (data: FinalReportModel) => TResult
) =>
  queryOptions({
    queryKey: ["reports", reportId],
    queryFn: () => getReport(reportId),
    select,
  });

export const useSuspenseGetReportById = <TResult = FinalReportModel>(
  reportId: string,
  select?: (data: FinalReportModel) => TResult
) => useSuspenseQuery(getReportByIdQueryOptions(reportId, select));

export const useGetReportById = <TResult = FinalReportModel>(
  reportId: string,

  select?: (data: FinalReportModel) => TResult
) => useQuery(getReportByIdQueryOptions(reportId, select));

export const getUserReportsQueryOptions = <TResult = FinalReportModel[]>(
  select?: (data: FinalReportModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["reports", "by-me"],
    queryFn: getUserReports,
    select,
  });

export const useSuspenseGetUserReports = <TResult = FinalReportModel[]>(
  select?: (data: FinalReportModel[]) => TResult
) => useSuspenseQuery(getUserReportsQueryOptions(select));

export const useGetUserReports = <TResult = FinalReportModel[]>(
  select?: (data: FinalReportModel[]) => TResult
) => useQuery(getUserReportsQueryOptions(select));
