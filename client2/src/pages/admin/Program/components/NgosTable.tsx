import { DataTableColumnHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProgramModel, UserModel } from "@/services/api/get-program.api";
import { useSuspenseListNgos } from "@/services/ngos.queries";
import { Link } from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { AddNgoInProgramDialog } from "./AddNgoInProgramDialog";
import formatDate from "@/lib/formatDate";

export const columns: ColumnDef<UserModel>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nume ONG"
        className="whitespace-nowrap  text-sm font-bold text-gray-900"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.original.attributes.ongName}
          </span>
        </div>
      );
    },
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
        row.original.attributes.contactFirstName ||
        row.original.attributes.contactLastName
          ? `${row.original.attributes.contactFirstName ?? ""} ${
              row.original.attributes.contactLastName ?? ""
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
    accessorKey: "enrolDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Data intrare program"
        className="whitespace-nowrap  text-sm font-bold text-gray-900"
      />
    ),
    cell: ({ row }) => <span>-</span>,
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
      return row.original.attributes.reports?.data?.at(-1)?.attributes
        ?.createdAt
        ? formatDate(
            row.original.attributes.reports?.data?.at(-1)?.attributes?.createdAt
          )
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
          params={{ userId: row.original.id.toString() }}
        >
          vezi
        </Link>
      </Button>
    ),
  },
];

function NgosTable({ ngos }: { ngos: UserModel[] }) {
  const [openAddNgoInProgramDialog, setOpenAddNgoInProgramDialog] =
    useState(false);

  const programNgoIds = ngos.map((ngo: UserModel) => ngo.id);

  const { data: allNgos } = useSuspenseListNgos();

  const availableNgos = useMemo(
    () => allNgos?.filter(({ id }) => !programNgoIds.includes(id)),
    [allNgos, programNgoIds]
  );

  const table = useReactTable({
    data: ngos,
    columns,
    rowCount: ngos.length,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          Persoane resursă în program
        </h1>
        {availableNgos.length > 0 && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button onClick={() => setOpenAddNgoInProgramDialog(true)}>
              Adaugă ONG
            </Button>
            <AddNgoInProgramDialog
              open={openAddNgoInProgramDialog}
              onOpenChange={setOpenAddNgoInProgramDialog}
              availableNgos={availableNgos}
              existingNgos={ngos}
            />
          </div>
        )}
      </div>

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
                  Nicio organizatie inscrisa in program
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default NgosTable;
