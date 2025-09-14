import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getDomains } from "./api/get-domains.api";

export const domainsQueryOptions = queryOptions({
  queryKey: ["domains"],
  queryFn: getDomains,
  staleTime: 0,
  placeholderData: [],
});

export const useSuspenseDomains = () => useSuspenseQuery(domainsQueryOptions);
export const useDomains = () => useQuery(domainsQueryOptions);
