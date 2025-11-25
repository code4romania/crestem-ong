import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import formatDate from "@/lib/formatDate";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon, Percent } from "lucide-react";
import type { ReportVM } from "../types";

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
    enableSorting: true,
  },
  {
    accessorKey: "ongName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ONG" />
    ),
    cell: ({ row }) => (
      <div className="max-w-48 min-w-48 text-wrap">
        {row.original.ngoName ?? "-"}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "domains",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DOMENIU DE ACTIVITATE" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.domains?.length
          ? row.original.domains.map((d) => <Badge key={d}>{d}</Badge>)
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
    enableSorting: true,
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LOCALITATE" />
    ),
    cell: ({ row }) => <div>{row.original.city ?? "-"}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "county",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JUDEȚ" />
    ),
    cell: ({ row }) => <div>{row.original.county ?? "-"}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "mentor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PERSOANA RESURSA ALOCATĂ" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.mentors.length
          ? row.original.mentors.map((m) => (
              <Badge variant="outline" key={m}>
                {m}
              </Badge>
            ))
          : "N/A"}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATĂ ÎNCEPUT" />
    ),
    cell: ({ row }) => <div>{formatDate(row.original.startDate)}</div>,
    enableSorting: true,

    meta: {
      label: "Dată Început",
      variant: "date",
      icon: CalendarIcon,
    },
    filterFn: (row, id, value) => {
      const rowValue = format(new Date(row.getValue<string>(id)), "yyyy-MM-dd");
      if (!Array.isArray(value) || value.length !== 2) return true; // fallback if invalid

      const [min, max] = value;
      return rowValue >= min && rowValue <= max;
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
    enableSorting: true,
    meta: {
      label: "Dată Final",
      variant: "date",
      icon: CalendarIcon,
    },
    filterFn: (row, id, value) => {
      const rowValue = format(new Date(row.getValue<string>(id)), "yyyy-MM-dd");
      if (!Array.isArray(value) || value.length !== 2) return true; // fallback if invalid

      const [min, max] = value;
      return rowValue >= min && rowValue <= max;
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
    enableSorting: true,
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
    enableSorting: true,
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
