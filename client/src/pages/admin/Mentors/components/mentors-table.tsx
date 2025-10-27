import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { useListMentors } from "@/services/mentors.queries";
import { columns } from "./mentors-columns";

export function MentorsTable() {
  const { data: mentors, isLoading } = useListMentors();

  const table = useReactTable({
    data: mentors ?? [],
    columns,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading)
    return (
      <DataTableSkeleton columnCount={columns.length} withPagination={false} />
    );
  return <DataTable table={table} emptyMessage="Nu există mentori"></DataTable>;
}
