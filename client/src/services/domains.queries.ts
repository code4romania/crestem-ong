import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listDomains } from "./api/list-domains.api";
import type { FinalDomainModel } from "./api/types";

export const listDomainsQueryOptions = <TResult = FinalDomainModel[]>(
  select?: (data: FinalDomainModel[]) => TResult
) =>
  queryOptions({
    queryKey: ["domains"],
    queryFn: listDomains,
    select,
  });

export const useSuspenseListDomains = <TResult = FinalDomainModel[]>(
  select?: (data: FinalDomainModel[]) => TResult
) => useSuspenseQuery(listDomainsQueryOptions(select));

export const useListDomains = <TResult = FinalDomainModel[]>(
  select?: (data: FinalDomainModel[]) => TResult
) => useQuery(listDomainsQueryOptions(select));
