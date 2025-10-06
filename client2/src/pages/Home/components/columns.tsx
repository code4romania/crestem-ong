import { DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import type { ReportVM } from "../types";
import { Button } from "@/components/ui/button";

export const programColumns: ColumnDef<ReportVM>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EVALUARE" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.original.evaluationName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "completionPeriod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PERIOADA DE COMPLETARE" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.original.completionPeriod}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "numberOfCompletions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SCOR OBȚINUT" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.original.numberOfCompletions}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SCOR OBȚINUT" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.original.score}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.isFinished ? "destructive" : "default"}>
          {row.original.isFinished ? "Incheiat" : "In desfasurare"}
        </Badge>
      );
    },
    enableSorting: false,
  },

  {
    id: "navigate",
    cell: ({ row }) => (
      <Button asChild variant="link">
        <Link
          to="/reports/$reportId"
          params={{ reportId: row.original.id.toString() }}
        >
          Vezi rezultatele
        </Link>
      </Button>
    ),
  },
];
