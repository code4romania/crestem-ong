import { DataTablePagination } from "@/components/data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTableUrlState } from "@/hooks/use-table-url-state";
import { Route } from "@/routes/(app)/programs";
import type { ListProgramsResponse } from "@/services/api/list-programs.api";
import type { PaginationModel } from "@/services/api/types";
import { useSuspenseListPrograms } from "@/services/programs.queries";
import { getRouteApi } from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect } from "react";
import type { ProgramVM } from "../type";
import { programColumns as columns } from "./columns";
import { TableToolbar } from "./toolbar";

const route = getRouteApi("/(app)/programs/");
const mapper = (
  result: ListProgramsResponse
): { pagination: PaginationModel; data: ProgramVM[] } => ({
  pagination: result.meta.pagination,
  data: result.data.map((p) => ({
    id: p.id,
    name: p.attributes.name,
    status:
      new Date() < new Date(p.attributes.endDate) ? "ongoing" : "finished",
    usersCount: p.attributes.usersCount,
    mentorsCount: p.attributes.mentorsCount,
  })),
});

export function ProgramsTable() {
  const search = Route.useSearch();

  const { data } = useSuspenseListPrograms(mapper);

  // Synced with URL states (updated to match route search schema defaults)
  const { sorting, pagination, ensurePageInRange } = useTableUrlState({
    search: route.useSearch(),
    navigate: route.useNavigate(),
    pagination: { defaultPage: 1, defaultPageSize: 25 },
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    rowCount: data.pagination.total,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // 🚨 important
    manualSorting: true, // 🚨 important
    manualFiltering: true, // 🚨 important
  });

  const pageCount = table.getPageCount();
  useEffect(() => {
    ensurePageInRange(pageCount);
  }, [pageCount, ensurePageInRange]);

  return (
    <div className="space-y-4 ">
      <TableToolbar />
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
