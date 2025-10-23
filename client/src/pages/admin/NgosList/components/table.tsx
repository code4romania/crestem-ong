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
import type { NgoVM } from "../types";
import { columns } from "./columns";
import { NgosPrimaryButtons } from "./primary-buttons";
import { NgosDataTableToolbar } from "./toolbar";
import type { FinalDetailedUserModel } from "@/services/api/types";
import { DataTable } from "@/components/ui/data-table";
import { useAuth } from "@/contexts/auth";
const route = getRouteApi("/(app)/users/");

const ngoMapper = (ngos: FinalDetailedUserModel[]): NgoVM[] =>
  ngos.map(
    (ngo): NgoVM => ({
      id: ngo.id,
      ongName: ngo.ongName,
      ongIdentificationNumber: ngo.ongIdentificationNumber,
      createdAt: ngo.createdAt,
      programName: ngo.program?.name || "-",
      county: ngo.county,
      city: ngo.city,
      domains: ngo.domains.map((d) => d.name) ?? [],
      lastEvaluationDate: ngo.reports?.at(-1)?.createdAt,
    })
  );
export function NgosTable() {
  const { userRole } = useAuth();
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
    globalFilter: { enabled: true, key: "search", trim: false },
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
        type: "array",
      },
      {
        columnId: "city",
        searchKey: "city",
        type: "array",
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
      columnPinning: {
        right: ["navigate"],
      },
    },
    enableRowSelection: false,
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
          {userRole === "fdsc" && <NgosPrimaryButtons table={table} />}
        </div>
      </Section>
      <Section>
        <DataTable table={table}>
          <NgosDataTableToolbar table={table}></NgosDataTableToolbar>
        </DataTable>
      </Section>
    </>
  );
}
