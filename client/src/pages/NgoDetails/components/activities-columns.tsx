import { DataTableColumnHeader } from "@/components/data-table/column-header";
import formatDate from "@/lib/formatDate";
import type { ColumnDef } from "@tanstack/react-table";
import type { MentorActivityVM } from "./type";

export const activitiesColumns: (
  ngoId: number
) => ColumnDef<MentorActivityVM>[] = (ngoId: number) => [
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
];
