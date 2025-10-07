import { DataTableColumnHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import formatDate from "@/lib/formatDate";
import type { ReportVM } from "../type";
import { CalendarIcon, Percent } from "lucide-react";
import { format } from "date-fns";

export const reportsColumns: ColumnDef<ReportVM>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.original.id}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "ongName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ONG" />
    ),
    cell: ({ row }) => <div>{row.original.ngoName ?? "-"}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "domains",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DOMENIU DE ACTIVITATE" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.domains?.length
          ? row.original.domains.map((d) => <Badge>{d}</Badge>)
          : "-"}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "ongIdentificationNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CIF" />
    ),
    cell: ({ row }) => <div>{row.original.ongIdentificationNumber ?? "-"}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LOCALITATE" />
    ),
    cell: ({ row }) => <div>{row.original.city ?? "-"}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "county",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JUDEȚ" />
    ),
    cell: ({ row }) => <div>{row.original.county ?? "-"}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "mentor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PERSOANA RESURSA ALOCATĂ" />
    ),
    cell: ({ row }) => <div>{row.original.mentor ?? "-"}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATĂ ÎNCEPUT" />
    ),
    cell: ({ row }) => <div>{formatDate(row.original.startDate)}</div>,
    enableSorting: false,

    meta: {
      label: "Dată Început",
      variant: "date",
      icon: CalendarIcon,
    },
    filterFn: (row, id, value) => {
      return format(new Date(value), "yyyy-MM-dd") === row.getValue<string>(id);
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATĂ FINAL" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.finished ? (
          formatDate(row.original.endDate)
        ) : (
          <Badge>În progres</Badge>
        )}
      </div>
    ),
    enableSorting: false,
    meta: {
      label: "Dată Final",
      variant: "date",
      icon: CalendarIcon,
    },
    filterFn: (row, id, value) => {
      return format(new Date(value), "yyyy-MM-dd") === row.getValue<string>(id);
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SCOR OBȚINUT" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.finished ? `${row.original.score}%` : <span>-</span>}
      </div>
    ),
    enableSorting: false,
    meta: {
      label: "Scor",
      variant: "range",
      range: [0, 100],
      unit: "%",
      icon: Percent,
    },
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      const rowValue = row.getValue<number>(id);

      if (!Array.isArray(value) || value.length !== 2) return true; // fallback if invalid

      const [min, max] = value;
      return rowValue >= min && rowValue <= max;
    },
  },
  {
    accessorKey: "completedEvaluationsCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NUMĂR COMPLETĂRI" />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.completedEvaluationsCount} /
        {row.original.evaluationsCount}
      </div>
    ),
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
          vezi
        </Link>
      </Button>
    ),
  },
];
