import { DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import type { ProgramVM } from "../type";
import { Button } from "@/components/ui/button";

export const programColumns: ColumnDef<ProgramVM>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DENUMIRE" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.original.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => {
      const isFinished = row.original.status === "finished";

      return (
        <Badge variant={isFinished ? "destructive" : "default"}>
          {isFinished ? "Incheiat" : "In desfasurare"}
        </Badge>
      );
    },
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      if (!value) return true;

      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "numberOfNgos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ONG-uri În PROGRAM" />
    ),
    cell: ({ row }) => <div>{row.original.usersCount ?? "-"}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "mentorsCount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PERSOANE RESURSĂ ÎN PROGRAM"
      />
    ),
    cell: ({ row }) => <div>{row.original.mentorsCount ?? "-"}</div>,
    enableSorting: false,
  },
  {
    id: "navigate",
    cell: ({ row }) => (
      <Button asChild variant="link">
        <Link
          to="/programs/$programId"
          params={{ programId: row.original.id.toString() }}
        >
          vezi
        </Link>
      </Button>
    ),
  },
];
