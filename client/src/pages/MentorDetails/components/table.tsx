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

const mapper = (result: MentorActivityModel[]): MentorActivityVM[] =>
  result.map((ma) => {
    return {
      id: ma.id.toString(),
      ngo: ma.user?.ongName ?? "N/A",
      dimension: ma.dimension?.name ?? "N/A",
      activityType: ma.type?.name ?? "N/A",
      startDate: ma.startDate ?? "N/A",
      duration: ma.duration ?? 0,
    };
  });

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
