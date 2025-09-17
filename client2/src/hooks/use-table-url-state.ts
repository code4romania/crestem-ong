import type {
  OnChangeFn,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

type SearchRecord = Record<string, unknown>;

export type NavigateFn = (opts: {
  search:
    | true
    | SearchRecord
    | ((prev: SearchRecord) => Partial<SearchRecord> | SearchRecord);
  replace?: boolean;
}) => void;

type UseTableUrlStateParams = {
  search: SearchRecord;
  navigate: NavigateFn;
  pagination?: {
    pageKey?: string;
    pageSizeKey?: string;
    defaultPage?: number;
    defaultPageSize?: number;
  };
};

type UseTableUrlStateReturn = {
  // Pagination
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  // Sorting
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  // Helpers
  ensurePageInRange: (
    pageCount: number,
    opts?: { resetTo?: "first" | "last" }
  ) => void;
};

export function useTableUrlState(
  params: UseTableUrlStateParams
): UseTableUrlStateReturn {
  const { search, navigate, pagination: paginationCfg } = params;

  const pageKey = paginationCfg?.pageKey ?? ("page" as string);
  const pageSizeKey = paginationCfg?.pageSizeKey ?? ("pageSize" as string);
  const defaultPage = paginationCfg?.defaultPage ?? 1;
  const defaultPageSize = paginationCfg?.defaultPageSize ?? 10;

  // Build initial column sort
  const initialColumnSorting: SortingState = useMemo(() => {
    const collected: SortingState = [];
    const raw = (search as SearchRecord)["sorting"];

    if (Array.isArray(raw) && raw.length > 0) {
      collected.push(...raw);
    }

    return collected;
  }, [search]);

  const [sorting, setSorting] = useState<SortingState>(initialColumnSorting);

  const pagination: PaginationState = useMemo(() => {
    const rawPage = (search as SearchRecord)[pageKey];
    const rawPageSize = (search as SearchRecord)[pageSizeKey];
    const pageNum = typeof rawPage === "number" ? rawPage : defaultPage;
    const pageSizeNum =
      typeof rawPageSize === "number" ? rawPageSize : defaultPageSize;
    return { pageIndex: Math.max(0, pageNum - 1), pageSize: pageSizeNum };
  }, [search, pageKey, pageSizeKey, defaultPage, defaultPageSize]);

  const onPaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const next = typeof updater === "function" ? updater(pagination) : updater;
    const nextPage = next.pageIndex + 1;
    const nextPageSize = next.pageSize;
    navigate({
      search: (prev) => ({
        ...(prev as SearchRecord),
        [pageKey]: nextPage <= defaultPage ? undefined : nextPage,
        [pageSizeKey]:
          nextPageSize === defaultPageSize ? undefined : nextPageSize,
      }),
    });
  };

  const onSortingChange: OnChangeFn<SortingState> = (updater) => {
    const next = typeof updater === "function" ? updater(sorting) : updater;

    setSorting(next);

    navigate({
      search: (prev) => ({
        ...(prev as SearchRecord),
        [pageKey]: undefined,
        sorting: next,
      }),
    });
  };

  const ensurePageInRange = (
    pageCount: number,
    opts: { resetTo?: "first" | "last" } = { resetTo: "first" }
  ) => {
    const currentPage = (search as SearchRecord)[pageKey];
    const pageNum = typeof currentPage === "number" ? currentPage : defaultPage;
    if (pageCount > 0 && pageNum > pageCount) {
      navigate({
        replace: true,
        search: (prev) => ({
          ...(prev as SearchRecord),
          [pageKey]: opts.resetTo === "last" ? pageCount : undefined,
        }),
      });
    }
  };

  return {
    pagination,
    onPaginationChange,
    ensurePageInRange,
    sorting,
    onSortingChange,
  };
}
