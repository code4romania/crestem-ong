import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import formatDate from "@/lib/formatDate";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import type { MenteeVM } from "../types";
import type { FinalProgramModel } from "@/services/api/types";

export const columns: ColumnDef<MenteeVM>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nume ONG"
        className="whitespace-nowrap py-4 text-sm font-bold text-gray-900 "
      />
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
    enableSorting: false,
  },
  {
    accessorKey: "ongIdentificationNumber",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="CIF"
        className="whitespace-nowrap py-4 text-sm font-bold text-gray-900 "
      />
    ),
    cell: ({ row }) => <div>{row.original.ongIdentificationNumber ?? "-"}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DATĂ ÎNREGISTRARE"
        className="whitespace-nowrap py-4 text-sm font-bold text-gray-900 "
      />
    ),
    cell: ({ row }) => {
      return formatDate(row.original.createdAt);
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      const rowValue = row.getValue<string>(id);

      if (!Array.isArray(value) || value.length !== 2) return true; // fallback if invalid

      const [min, max] = value;
      return rowValue >= min && rowValue <= max;
    },
  },
  {
    accessorKey: "ngoPrograms",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PROGRAME ASOCIATE"
        className="whitespace-nowrap py-4 text-sm font-bold text-gray-900 "
      />
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        1222
        {row.original.ngoPrograms?.map(({ id, name, endDate }) => (
          <Badge
            key={id}
            variant={new Date() > new Date(endDate) ? "warning" : "default"}
          >
            {name}
          </Badge>
        ))}
      </div>
    ),
    enableSorting: false,
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
      <DataTableColumnHeader
        column={column}
        title="JUDEȚ"
        className="whitespace-nowrap py-4 text-sm font-bold text-gray-900 "
      />
    ),
    cell: ({ row }) => <span>{row.original.county}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="LOCALITATE"
        className="whitespace-nowrap py-4 text-sm font-bold text-gray-900 "
      />
    ),
    cell: ({ row }) => <span>{row.original.city}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "domains",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DOMENIU DE ACTIVITATE"
        className="whitespace-nowrap py-4 text-sm font-bold text-gray-900 "
      />
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
    enableSorting: false,
  },
  {
    accessorKey: "lastEvaluationDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ULTIMA EVALUARE"
        className="whitespace-nowrap py-4 text-sm font-bold text-gray-900 "
      />
    ),
    cell: ({ row }) => {
      return row.original.lastEvaluationDate
        ? formatDate(row.original.lastEvaluationDate)
        : "-";
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      const rowValue = row.getValue<string>(id);

      if (!Array.isArray(value) || value.length !== 2) return true; // fallback if invalid

      const [min, max] = value;
      return rowValue >= min && rowValue <= max;
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
