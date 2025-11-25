import {
  getCoreRowModel,
  getPaginationRowModel,
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
import { DataTable } from "@/components/ui/data-table";
import { useAuth } from "@/contexts/auth";
import { useTableUrlState } from "@/hooks/use-table-url-state";
import type { FinalDetailedUserModel } from "@/services/api/types";
import type { NgoVM } from "../types";
import { columns } from "./columns";
import { NgosPrimaryButtons } from "./primary-buttons";
import { NgosDataTableToolbar } from "./toolbar";
const route = getRouteApi("/(app)/users/");

const ngoMapper = (ngos: FinalDetailedUserModel[]): NgoVM[] =>
  ngos.map(
    (ngo): NgoVM => ({
      id: ngo.id,
      ongName: ngo.ongName,
      ongIdentificationNumber: ngo.ongIdentificationNumber,
      createdAt: ngo.createdAt,
      ngoPrograms: ngo.ngoPrograms ?? [],
      county: ngo.county,
      city: ngo.city,
      domains: ngo.domains.map((d) => d.name) ?? [],
      lastEvaluationDate: ngo.reports?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0]?.createdAt,
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
    pagination,
    onPaginationChange,
  } = useTableUrlState({
    search: route.useSearch(),
    navigate: route.useNavigate(),
    pagination: { defaultPage: 1, defaultPageSize: 25 },
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
        columnId: "ngoPrograms",
        searchKey: "ngoPrograms",
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
      pagination,
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
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange,
    onGlobalFilterChange,
    onColumnFiltersChange,
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
        <DataTable
          table={table}
          emptyMessage="Nu există organizații"
          hasPagination
        >
          <NgosDataTableToolbar table={table}></NgosDataTableToolbar>
        </DataTable>
      </Section>
    </>
  );
}
