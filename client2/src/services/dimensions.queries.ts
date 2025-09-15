import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listDimensions } from "./api/list-dimensions.api";

export const listDimensionsQueryOptions = queryOptions({
  queryKey: ["dimensions"],
  queryFn: listDimensions,
  staleTime: 0,
  placeholderData: [],
});

export const useSuspenseListDimensions = () =>
  useSuspenseQuery(listDimensionsQueryOptions);
export const useListDimensions = () => useQuery(listDimensionsQueryOptions);
