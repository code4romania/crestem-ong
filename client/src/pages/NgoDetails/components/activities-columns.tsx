import { DataTableColumnHeader } from "@/components/data-table/column-header";
import formatDate from "@/lib/formatDate";
import type { ColumnDef } from "@tanstack/react-table";
import type { MentorActivityVM } from "./type";

export const activitiesColumns: (
  ngoId: number
) => ColumnDef<MentorActivityVM>[] = (ngoId: number) => [
  {
    accessorKey: "mentor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mentor" />
    ),
    cell: ({ row }) =>
      row.original.mentor.firstName + " " + row.original.mentor.lastName,
    enableSorting: false,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dată" />
    ),
    cell: ({ row }) => {
      return formatDate(row.original.startDate);
    },
    enableSorting: false,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Durată activitate (ore)" />
    ),
    cell: ({ row }) => {
      return (
        <span className="text-right w-full">{row.original.duration} ore</span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "dimension",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dimensiune" />
    ),
    cell: ({ row }) => {
      return row.original.dimension.name;
    },
    enableSorting: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tip activitate" />
    ),
    cell: ({ row }) => {
      return row.original.type.name;
    },
    enableSorting: false,
  },
];
