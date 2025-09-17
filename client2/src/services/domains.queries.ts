import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listDomains, type ListDomainsResponse } from "./api/list-domains.api";

export const listDomainsQueryOptions = <TResult = ListDomainsResponse>(
  select?: (data: ListDomainsResponse) => TResult
) =>
  queryOptions({
    queryKey: ["domains"],
    queryFn: listDomains,
    staleTime: 0,
    select,
  });

export const useSuspenseListDomains = <TResult = ListDomainsResponse>(
  select?: (data: ListDomainsResponse) => TResult
) => useSuspenseQuery(listDomainsQueryOptions(select));

export const useListDomains = <TResult = ListDomainsResponse>(
  select?: (data: ListDomainsResponse) => TResult
) => useQuery(listDomainsQueryOptions(select));
