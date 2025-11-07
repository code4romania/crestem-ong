import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { DomainModel } from "./api/types";
import { listDomains } from "./api/list-domains.api";

export const listDomainsQueryOptions = <TResult = DomainModel[]>(
  select?: (data: DomainModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["domains"],
    queryFn: listDomains,
    select,
  });

export const useSuspenseListDomains = <TResult = DomainModel[]>(
  select?: (data: DomainModel[]) => TResult
) => useSuspenseQuery(listDomainsQueryOptions(select));

export const useListDomains = <TResult = DomainModel[]>(
  select?: (data: DomainModel[]) => TResult
) => useQuery(listDomainsQueryOptions(select));
