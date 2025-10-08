import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import type { MentorActivityVM } from "./types";
import formatDate from "@/lib/formatDate";

export const programColumns: ColumnDef<MentorActivityVM>[] = [
  {
    accessorKey: "ngo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organizație" />
    ),
  },
  {
    accessorKey: "activityType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tip activitate" />
    ),
  },
  {
    accessorKey: "dimension",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dimensiune" />
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Durată activitate (ore)" />
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dată" />
    ),
    cell: ({ row }) => {
      return formatDate(row.original.startDate);
    },
  },

  {
    id: "navigate",
    cell: ({ row }) => (
      <Button asChild variant="link">
        <Link
          to="/activities/$activityId"
          params={{ activityId: row.original.id.toString() }}
        >
          Vezi activitatea
        </Link>
      </Button>
    ),
  },
];
