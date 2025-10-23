import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import formatDate from "@/lib/formatDate";
import type { MentorModel } from "@/services/api/list-mentors.api";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<MentorModel>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nume"
        className="whitespace-nowrap py-4  text-sm font-bold text-gray-900"
      />
    ),
    cell: ({ row }) => {
      const mentorName =
        row.original.firstName || row.original.lastName
          ? `${row.original.firstName ?? ""} ${
              row.original.lastName ?? ""
            }`.trim()
          : "-";

      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {mentorName}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "dimensions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Specializare"
        className="whitespace-nowrap py-4  text-sm font-bold text-gray-900"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-2">
          {row.original.dimensions?.map((dimension) => (
            <Badge variant="secondary" key={dimension.id}>
              {dimension.name}
            </Badge>
          )) ?? "-"}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "availability",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Disponibilitate"
        className="whitespace-nowrap py-4  text-sm font-bold text-gray-900"
      />
    ),
    cell: ({ row }) =>
      row.original.available ? (
        <Badge>Disponibil</Badge>
      ) : (
        <Badge variant="destructive">Indisponibil</Badge>
      ),
    enableSorting: false,
  },
  {
    accessorKey: "lastActivity",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ultima activitate"
        className="whitespace-nowrap py-4  text-sm font-bold text-gray-900"
      />
    ),
    cell: ({ row }) => {
      return row.original.mentorActivities?.length
        ? formatDate(row.original.mentorActivities?.[0]?.createdAt)
        : "-";
    },
    enableSorting: false,
  },
  {
    id: "navigate",
    cell: ({ row }) => (
      <Button asChild variant="link">
        <Link
          to="/mentors/$mentorId"
          params={{ mentorId: row.original.id.toString() }}
        >
          vezi
        </Link>
      </Button>
    ),
  },
];
