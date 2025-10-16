import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Badge } from "@/components/ui/badge";
import formatDate from "@/lib/formatDate";
import type { ColumnDef } from "@tanstack/react-table";
import type { ReportVM } from "./type";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export const reportsColumns: (
  ngoId: number,
  downloadReport: (report: ReportVM) => void
) => ColumnDef<ReportVM>[] = (
  ngoId: number,
  downloadReport: (report: ReportVM) => void
) => [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EVALUARE" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            Evaluare {formatDate(row.original.createdAt)}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "evaluationPeriod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PERIOADA DE COMPLETARE" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {formatDate(row.original.createdAt)} -
            {formatDate(row.original.deadline)}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "numberOfCompletedEvaluations",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TOTAL COMPLETĂRI" />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <span>
          {row.original.numberOfCompletedEvaluations} /{" "}
          {row.original.totalEvaluations}
        </span>
      );
    },
  },

  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SCOR OBȚINUT" />
    ),
    cell: ({ row }) => {
      return <span>{row.original.score}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "finished",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => {
      return row.original.finished ? (
        <Badge variant="destructive">Finalizat</Badge>
      ) : (
        <Badge>In desfasurare</Badge>
      );
    },
    enableSorting: false,
  },
  {
    id: "download",
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => downloadReport(row.original)}
          disabled={row.original.numberOfCompletedEvaluations === 0}
        >
          <DownloadIcon className="w-4 h-4" />
        </Button>
      );
    },
  },
  {
    id: "view",
    cell: ({ row }) => {
      return (
        <Button variant="link" asChild>
          <Link
            to="/reports/$reportId"
            params={{ reportId: row.original.id.toString() }}
            search={{ fromNgoId: ngoId }}
          >
            Vezi
          </Link>
        </Button>
      );
    },
  },
];
