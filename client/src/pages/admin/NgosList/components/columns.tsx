import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import formatDate from "@/lib/formatDate";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import type { NgoVM } from "../types";
import type { FinalProgramModel } from "@/services/api/types";
import { format } from "date-fns";

export const columns: ColumnDef<NgoVM>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nume ONG" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.original.ongName}
          </span>
        </div>
      );
    },
    enableSorting: true,
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATĂ ÎNREGISTRARE" />
    ),
    cell: ({ row }) => {
      return formatDate(row.original.createdAt);
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      const rowValue = format(row.getValue<string>(id), "yyyy-MM-dd");

      if (!Array.isArray(value) || value.length !== 2) return true; // fallback if invalid

      const [min, max] = value;
      return rowValue >= min && rowValue <= max;
    },
  },
  {
    accessorKey: "ngoPrograms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PROGRAME ASOCIATE" />
    ),
    cell: ({ row }) =>
      row.original.ngoPrograms?.length ? (
        <div className="flex flex-wrap gap-2">
          {row.original.ngoPrograms?.map((program) =>
            program ? (
              <Badge
                key={program.id}
                variant={
                  new Date() > new Date(program.endDate) ? "warning" : "default"
                }
              >
                {program.name}
              </Badge>
            ) : (
              "-"
            )
          )}
        </div>
      ) : (
        "-"
      ),
    enableSorting: true,
    filterFn: (row, id, value) => {
      const cellValues = row.getValue<FinalProgramModel[]>(id) ?? [];

      // Extract names from program objects
      const programNames = cellValues.map((x) => x.name);

      // If no filter applied → always include row
      if (value.length === 0) return true;

      // Match any selected value
      return programNames.some((name) => value.includes(name));
    },
  },
  {
    accessorKey: "county",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JUDEȚ" />
    ),
    cell: ({ row }) => <span>{row.original.county}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LOCALITATE" />
    ),
    cell: ({ row }) => <span>{row.original.city}</span>,
    enableSorting: true,
  },
  {
    accessorKey: "domains",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DOMENIU DE ACTIVITATE" />
    ),
    cell: ({ row }) => {
      return row.original.domains?.length ? (
        <div className="flex flex-wrap gap-2">
          {row.original.domains.map((domain) => (
            <Badge key={domain}>{domain}</Badge>
          ))}
        </div>
      ) : (
        "-"
      );
    },
    filterFn: (row, id, value) => {
      const cellValues = row.getValue<string[]>(id) ?? [];
      return value.length === 0 || cellValues.some((v) => value.includes(v));
    },
    enableSorting: true,
  },
  {
    accessorKey: "lastEvaluationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ULTIMA EVALUARE" />
    ),
    cell: ({ row }) => {
      return row.original.lastEvaluationDate
        ? formatDate(row.original.lastEvaluationDate)
        : "-";
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      const rowValue = row.getValue<string | undefined>(id);
      if (!Array.isArray(value) || value.length !== 2) return true; // fallback if invalid

      if (!rowValue) return false;

      const [min, max] = value;
      return (
        format(rowValue, "yyyy-MM-dd") >= min &&
        format(rowValue, "yyyy-MM-dd") <= max
      );
    },
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
