import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTableUrlState } from "@/hooks/use-table-url-state";
import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScore } from "@/lib/score";
import type { ListReportsResponse } from "@/services/api/list-reports.api";
import { useSuspenseListReports } from "@/services/reports.queries";
import { getRouteApi } from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
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
      ngoName: report.user?.ongName,
      domains: report.user?.domains?.map((d) => d.name) ?? [],
      ongIdentificationNumber: report.user?.ongIdentificationNumber,
      city: report.user?.city,
      county: report.user?.county,
      mentor: report.user?.mentor
        ? [
            report.user?.mentor?.firstName || "",
            report.user?.mentor?.lastName || "",
          ]
            .filter(Boolean)
            .join(" ")
        : "NA",
      startDate: report.createdAt.split("T")[0],
      endDate: report.deadline.split("T")[0],
      score: calcScore(completedEvaluations) || 0,
      completedEvaluationsCount: completedEvaluations.length,
      evaluationsCount: report.evaluations.length,
      evaluations: report.evaluations,
    };
  });

export function ReportsTable() {
  const { data } = useSuspenseListReports(reportsMapper);

  // Synced with URL states (updated to match route search schema defaults)
  const {
    globalFilter,
    onGlobalFilterChange,
    columnFilters,
    onColumnFiltersChange,
    onPaginationChange,
  } = useTableUrlState({
    search: route.useSearch(),
    navigate: route.useNavigate(),
    pagination: { defaultPage: 1, defaultPageSize: 10 },
    globalFilter: { enabled: true, key: "search" },
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
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange,
    onGlobalFilterChange,
    onColumnFiltersChange,
    manualPagination: true,
  });

  return (
    <div className="space-y-4 ">
      <DataTableToolbar table={table}></DataTableToolbar>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  0 Rezultate
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
