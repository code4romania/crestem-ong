import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import formatDate from "@/lib/formatDate";
import type { FinalProgramModel, FinalUserModel } from "@/services/api/types";
import { useSuspenseListNgos } from "@/services/ngos.queries";
import { Link } from "@tanstack/react-router";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { AddNgoInProgramDialog } from "./AddNgoInProgramDialog";

export const columns: (programId: number) => ColumnDef<FinalUserModel>[] = (
  programId: number
) => [
  {
    accessorKey: "ongName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ONG"
        className="whitespace-nowrap  text-sm font-bold text-gray-900"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "ongIdentificationNumber",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="CUI"
        className="whitespace-nowrap  text-sm font-bold text-gray-900"
      />
    ),
    enableSorting: false,
  },

  {
    accessorKey: "contactPersonName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nume reprezentant"
        className="whitespace-nowrap  text-sm font-bold text-gray-900"
      />
    ),
    cell: ({ row }) => {
      const contactPersonName =
        row.original.contactFirstName || row.original.contactLastName
          ? `${row.original.contactFirstName ?? ""} ${
              row.original.contactLastName ?? ""
            }`.trim()
          : "-";

      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {contactPersonName}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "programJoinedAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Data intrare program"
        className="whitespace-nowrap  text-sm font-bold text-gray-900"
      />
    ),
    cell: ({ row }) => <span>{formatDate(row.original.programJoinedAt)}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "lastEvaluation",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ultima evaluare"
        className="whitespace-nowrap  text-sm font-bold text-gray-900"
      />
    ),
    cell: ({ row }) => {
      return row.original.reports?.at(-1)?.createdAt
        ? formatDate(row.original.reports?.at(-1)?.createdAt)
        : "-";
    },
    enableSorting: false,
  },
  {
    id: "navigate",
    cell: ({ row }) => (
      <Button asChild variant="link">
        <Link
          to="/users/$userId"
          search={{ returnToProgramId: programId.toString() }}
          params={{ userId: row.original.id.toString() }}
        >
          vezi
        </Link>
      </Button>
    ),
  },
];
function NgosTable({
  ngos,
  program,
}: {
  ngos: FinalUserModel[];
  program: FinalProgramModel;
}) {
  const [openAddNgoInProgramDialog, setOpenAddNgoInProgramDialog] =
    useState(false);

  const programNgoIds = ngos.map((ngo: FinalUserModel) => ngo.id);

  const { data: allNgos } = useSuspenseListNgos();

  const availableNgos = useMemo(
    () => allNgos?.filter(({ id }) => !programNgoIds.includes(id)),
    [allNgos, programNgoIds]
  );
  const memoizedColumns = useMemo(() => columns(program.id), [program.id]);

  const table = useReactTable({
    data: ngos,
    columns: memoizedColumns,
    rowCount: ngos.length,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          ONG-uri în program
        </h1>
        {availableNgos.length > 0 && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button
              onClick={() => setOpenAddNgoInProgramDialog(true)}
              disabled={new Date(program.endDate) < new Date()}
            >
              Adaugă ONG
            </Button>
            <AddNgoInProgramDialog
              open={openAddNgoInProgramDialog}
              onOpenChange={setOpenAddNgoInProgramDialog}
              availableNgos={availableNgos}
            />
          </div>
        )}
      </div>
      <DataTable
        table={table}
        emptyMessage="Nici-un ONG inscris in program"
      ></DataTable>
    </div>
  );
}

export default NgosTable;
