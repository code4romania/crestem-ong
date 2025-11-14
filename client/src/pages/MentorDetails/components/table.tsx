import { DataTable } from "@/components/ui/data-table";
import { useAuth } from "@/contexts/auth";
import { useListMentorMentorActivities } from "@/services/activities.queries";
import type {
  FinalDetailedUserModel,
  MentorActivityModel,
} from "@/services/api/types";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { programColumns as columns } from "./columns";
import type { MentorActivityVM } from "./types";
import { mapper } from "./mapper";

export function MentorActivitiesTable({
  mentor,
}: {
  mentor: FinalDetailedUserModel;
}) {
  const { data } = useListMentorMentorActivities(mentor.id, mapper);

  const { userRole } = useAuth();

  const table = useReactTable({
    data: data ?? [],
    columns,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableSorting: false,
    enableGlobalFilter: false,
    enableColumnFilters: false,
    enableColumnPinning: false,
    enableColumnResizing: false,
  });

  if (userRole !== "fdsc") {
    return null;
  }

  return (
    <DataTable table={table} emptyMessage="Nu există activități"></DataTable>
  );
}
