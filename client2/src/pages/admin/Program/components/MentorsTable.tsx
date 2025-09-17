import { DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProgramMentorModel } from "@/services/api/get-program.api";
import { useSuspenseListMentors } from "@/services/mentors.queries";
import { Link } from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { AddMentorInProgramDialog } from "./AddMentorInProgramDialog";

export const columns: ColumnDef<ProgramMentorModel>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nume"
        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-gray-900 sm:pl-3"
      />
    ),
    cell: ({ row }) => {
      const mentorName =
        row.original.attributes.firstName || row.original.attributes.lastName
          ? `${row.original.attributes.firstName ?? ""} ${
              row.original.attributes.lastName ?? ""
            }`.trim()
          : "-";

      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {mentorName}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "dimensions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Specializare"
        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-gray-900 sm:pl-3"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-2">
          {row.original.attributes.dimensions?.data?.map((dimension) => (
            <Badge variant="secondary">{dimension.attributes.name}</Badge>
          )) ?? "-"}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "availability",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Disponibilitate"
        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-gray-900 sm:pl-3"
      />
    ),
    cell: ({ row }) =>
      row.original.attributes.available ? (
        <Badge>Disponibil</Badge>
      ) : (
        <Badge variant="destructive">Indisponibil</Badge>
      ),
    enableSorting: false,
  },
  {
    accessorKey: "lastActivity",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ultima activitate"
        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-gray-900 sm:pl-3"
      />
    ),
    cell: ({ row }) => {
      return row.original.attributes.mentorActivities?.data?.length
        ? new Date(
            row.original.attributes.mentorActivities?.data[0]?.createdAt
          )?.toLocaleString("ro-RO", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
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

function MentorsTable({ mentors }: { mentors: ProgramMentorModel[] }) {
  const [openAddMentorInProgramDialog, setOpenAddMentorInProgramDialog] =
    useState(false);

  const programMentorsIds = mentors.map(
    (mentor: ProgramMentorModel) => mentor.id
  );

  const { data: allMentors } = useSuspenseListMentors();

  const availableMentors = useMemo(
    () => allMentors?.filter(({ id }) => !programMentorsIds.includes(id)),
    [allMentors, programMentorsIds]
  );

  const table = useReactTable({
    data: mentors,
    columns,
    rowCount: mentors.length,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          Persoane resursă în program
        </h1>
        {availableMentors.length > 0 && (
          <div>
            <Button onClick={() => setOpenAddMentorInProgramDialog(true)}>
              Adaugă persoană resursă
            </Button>
            <AddMentorInProgramDialog
              open={openAddMentorInProgramDialog}
              onOpenChange={setOpenAddMentorInProgramDialog}
              availableMentors={availableMentors}
              existingMentors={mentors}
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
                  Nicio persoana resursa inscrisa in program
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default MentorsTable;
