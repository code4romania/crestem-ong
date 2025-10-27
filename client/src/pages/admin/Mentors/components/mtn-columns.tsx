import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Button } from "@/components/ui/button";
import type { MentorshipRelationModel } from "@/services/api/types";
import { type ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";

export const mtnColumns = (
  setSelectedMentorshipRelationId: (mentorshipRelationId: number) => void
): ColumnDef<MentorshipRelationModel>[] => [
  {
    accessorKey: "mentor",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Mentor"
        className="whitespace-nowrap py-4  text-sm font-bold text-gray-900"
      />
    ),
    cell: ({ row }) => {
      const mentorName =
        row.original.mentor.firstName || row.original.mentor.lastName
          ? `${row.original.mentor.firstName ?? ""} ${
              row.original.mentor.lastName ?? ""
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
    accessorKey: "ngo",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ONG"
        className="whitespace-nowrap py-4  text-sm font-bold text-gray-900"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.original.user.ongName}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "delete",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSelectedMentorshipRelationId(row.original.id)}
      >
        <Trash2Icon className="size-4 text-destructive" />
      </Button>
    ),
  },
];
