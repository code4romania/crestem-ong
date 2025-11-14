import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listActivityTypes } from "./api/list-activity-types.api";
import type { ActivityTypeModel } from "./api/types";

export const listActivityTypesQueryOptions = <TResult = ActivityTypeModel[]>(
  select?: (data: ActivityTypeModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["activity-types"],
    queryFn: listActivityTypes,
    select,
  });

export const useSuspenseListActivityTypes = <TResult = ActivityTypeModel[]>(
  select?: (data: ActivityTypeModel[]) => TResult
) => useSuspenseQuery(listActivityTypesQueryOptions(select));

export const useListActivityTypes = <TResult = ActivityTypeModel[]>(
  select?: (data: ActivityTypeModel[]) => TResult
) => useQuery(listActivityTypesQueryOptions(select));
