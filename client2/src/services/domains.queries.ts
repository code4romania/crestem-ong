import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { listDomains } from "./api/list-domains.api";

export const listDomainsQueryOptions = queryOptions({
  queryKey: ["domains"],
  queryFn: listDomains,
  staleTime: 0,
  placeholderData: [],
});

export const useSuspenseListDomains = () =>
  useSuspenseQuery(listDomainsQueryOptions);
export const useListDomains = () => useQuery(listDomainsQueryOptions);
