import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Button } from "@/components/ui/button";
import { router } from "@/index";
import formatDate from "@/lib/formatDate";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import type { MentorActivityVM } from "./types";

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
      <DataTableColumnHeader column={column} title="Durată activitate" />
    ),
    cell: ({ row }) => {
      return (
        <span className="text-right w-full">{row.original.duration} ore</span>
      );
    },
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
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notițe" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left max-w-96 truncate mask-ellipsis">
          {row.original.notes || "-"}
        </div>
      );
    },
    size: 200,
  },

  {
    id: "navigate",
    cell: ({ row }) => (
      <Button asChild variant="link">
        <Link
          to="/activities/$activityId"
          params={{ activityId: row.original.id.toString() }}
          search={{
            returnTo: router.state.location.pathname,
          }}
        >
          Vezi activitatea
        </Link>
      </Button>
    ),
  },
];
