import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useSuspenseListNgosWithDetails } from "@/services/ngos.queries";
import { getRouteApi } from "@tanstack/react-router";

import Heading from "@/components/Heading";
import Section from "@/components/Section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTableUrlState } from "@/hooks/use-table-url-state";
import type { DetailedNgoModel } from "@/services/api/list-ngos.api";
import type { NgoVM } from "../types";
import { columns } from "./columns";
import { NgosPrimaryButtons } from "./primary-buttons";
import { NgosDataTableToolbar } from "./toolbar";
const route = getRouteApi("/(app)/users/");

const ngoMapper = (ngos: DetailedNgoModel[]): NgoVM[] =>
  ngos.map(
    (ngo): NgoVM => ({
      id: ngo.id,
      ongName: ngo.ongName,
      createdAt: ngo.createdAt,
      programName: ngo.program?.name || "-",
      county: ngo.county,
      city: ngo.city,
      domains: ngo.domains.map((d) => d.name) ?? [],
      lastEvaluationDate: ngo.reports?.at(-1)?.createdAt,
    })
  );
export function NgosTable() {
  const { data } = useSuspenseListNgosWithDetails(ngoMapper);
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
        columnId: "createdAt",
        searchKey: "createdAt",
        type: "array",
      },
      {
        columnId: "lastEvaluationDate",
        searchKey: "lastEvaluationDate",
        type: "array",
      },
      {
        columnId: "county",
        searchKey: "county",
        type: "string",
      },
      {
        columnId: "city",
        searchKey: "city",
        type: "string",
      },
      {
        columnId: "programName",
        searchKey: "programName",
        type: "array",
      },
      {
        columnId: "domains",
        searchKey: "domains",
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
    enableRowSelection: true,
    globalFilterFn: (row, _columnId, filterValue) => {
      const name = String(row.original.ongName).toLowerCase();
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
    <>
      <Section>
        <div className="flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <Heading level={"h2"}>Organizații</Heading>
          </div>
          <NgosPrimaryButtons table={table} />
        </div>
      </Section>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
        <div className="space-y-4">
          <NgosDataTableToolbar table={table}></NgosDataTableToolbar>
          <div className="rounded-md border">
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
                    <TableRow key={row.id}>
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
      </div>
    </>
  );
}
