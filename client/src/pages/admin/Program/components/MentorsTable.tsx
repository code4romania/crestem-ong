import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import formatDate from "@/lib/formatDate";
import type { FinalProgramModel, FinalUserModel } from "@/services/api/types";
import { useSuspenseListMentors } from "@/services/mentors.queries";
import { Link } from "@tanstack/react-router";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { AddMentorInProgramDialog } from "./AddMentorInProgramDialog";

export const columns: (programId: number) => ColumnDef<FinalUserModel>[] = (
  programId: number
) => [
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
        row.original.firstName || row.original.lastName
          ? `${row.original.firstName ?? ""} ${
              row.original.lastName ?? ""
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
          {row.original.dimensions?.map((dimension) => (
            <Badge variant="secondary">{dimension.name}</Badge>
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
      row.original.available ? (
        <Badge>Disponibil</Badge>
      ) : (
        <Badge variant="secondary">Indisponibil</Badge>
      ),
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
    accessorKey: "lastActivity",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ultima activitate"
        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-gray-900 sm:pl-3"
      />
    ),
    cell: ({ row }) => {
      return row.original.mentorActivities?.length
        ? formatDate(row.original.mentorActivities?.[0]?.createdAt)
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

function MentorsTable({
  mentors,
  program,
}: {
  mentors: FinalUserModel[];
  program: FinalProgramModel;
}) {
  const [openAddMentorInProgramDialog, setOpenAddMentorInProgramDialog] =
    useState(false);

  const programMentorsIds = mentors.map((mentor: FinalUserModel) => mentor.id);

  const { data: allMentors } = useSuspenseListMentors();

  const availableMentors = useMemo(
    () => allMentors?.filter(({ id }) => !programMentorsIds.includes(id)),
    [allMentors, programMentorsIds]
  );

  const memoizedColumns = useMemo(() => columns(program.id), [program.id]);

  const table = useReactTable({
    data: mentors,
    columns: memoizedColumns,
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
            <Button
              onClick={() => setOpenAddMentorInProgramDialog(true)}
              disabled={new Date(program.endDate) < new Date()}
            >
              Adaugă persoană resursă
            </Button>
            <AddMentorInProgramDialog
              open={openAddMentorInProgramDialog}
              onOpenChange={setOpenAddMentorInProgramDialog}
              availableMentors={availableMentors}
            />
          </div>
        )}
      </div>
      <div className="overflow-hidden rounded-md border">
        <DataTable
          table={table}
          emptyMessage="Nu există persoane resursă în program"
        ></DataTable>
      </div>
    </div>
  );
}

export default MentorsTable;
