import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTable } from "@/components/ui/data-table";
import { useTableUrlState } from "@/hooks/use-table-url-state";
import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScore } from "@/lib/score";
import type { ListReportsResponse } from "@/services/api/list-reports.api";
import { useSuspenseListReports } from "@/services/reports.queries";
import { getRouteApi } from "@tanstack/react-router";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ReportVM } from "../type";
import { reportsColumns as columns } from "./columns";

const route = getRouteApi("/(app)/reports/");

export const reportsMapper = (reports: ListReportsResponse): ReportVM[] =>
  reports.data.map((report) => {
    const completedEvaluations = evaluationsCompletedFilter(report.evaluations);
    return {
      id: report.id,
      finished: report.finished,
      ngoName: report.user?.ongName || "-",
      domains: report.user?.domains?.map((d) => d.name) ?? [],
      ongIdentificationNumber: report.user?.ongIdentificationNumber || "-",
      city: report.user?.city || "-",
      county: report.user?.county || "-",
      mentors:
        report.user?.mentors?.map(
          (m) => [m?.firstName, m?.lastName].filter(Boolean).join(" ") ?? "N/A"
        ) ?? [],
      startDate: report.createdAt.split("T")[0],
      endDate: report.deadline.split("T")[0],
      score: calcScore(completedEvaluations) || 0,
      completedEvaluationsCount: completedEvaluations.length,
      evaluationsCount: report.evaluations.length,
      evaluations: report.evaluations,
    } as ReportVM;
  });

export function ReportsTable() {
  const { data } = useSuspenseListReports(reportsMapper);

  // Synced with URL states (updated to match route search schema defaults)
  const {
    globalFilter,
    onGlobalFilterChange,
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
  } = useTableUrlState({
    search: route.useSearch(),
    navigate: route.useNavigate(),
    pagination: { defaultPage: 1, defaultPageSize: 25 },
    globalFilter: { enabled: true, key: "search", trim: false },
    columnFilters: [
      {
        columnId: "startDate",
        searchKey: "startDate",
        type: "string",
      },
      {
        columnId: "endDate",
        searchKey: "endDate",
        type: "string",
      },
      {
        columnId: "score",
        searchKey: "score",
        type: "array",
      },
    ],
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination,
      columnPinning: {
        right: ["navigate"],
      },
    },
    enableRowSelection: false,

    globalFilterFn: (row, _columnId, filterValue) => {
      const name = String(row.original.ngoName).toLowerCase();
      const searchValue = String(filterValue).toLowerCase();

      return name.toLowerCase().includes(searchValue.toLowerCase());
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange,
    onGlobalFilterChange,
    onColumnFiltersChange,
  });

  return (
    <div className="space-y-4 ">
      <DataTableToolbar table={table}></DataTableToolbar>
      <div className="overflow-hidden rounded-md border">
        <DataTable
          table={table}
          emptyMessage={"Nu există evaluări"}
          hasPagination
        />
      </div>
    </div>
  );
}
