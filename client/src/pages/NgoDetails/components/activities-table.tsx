import { DataTable } from "@/components/ui/data-table";
import { useListNgoMentorActivities } from "@/services/activities.queries";
import type {
  FinalDetailedUserModel,
  MentorActivityModel,
} from "@/services/api/types";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { activitiesColumns } from "./activities-columns";
import type { MentorActivityVM } from "./type";

export const toMentorActivityVM = (
  activities: MentorActivityModel[]
): MentorActivityVM[] =>
  activities.map((activity) => ({
    id: activity.id,
    createdAt: activity.createdAt,
    startDate: activity.startDate,
    duration: activity.duration,
    dimension: activity.dimension,
    type: activity.type,
    mentor: activity.mentor,
    notes: activity.notes,
  })) ?? [];

function MentorActivitiesTable({ ngo }: { ngo: FinalDetailedUserModel }) {
  const { data: activities } = useListNgoMentorActivities(
    ngo.id,
    toMentorActivityVM
  );

  const table = useReactTable({
    data: activities ?? [],
    columns: activitiesColumns,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable
      table={table}
      emptyMessage="Nu există activități"
      className="mt-4"
    ></DataTable>
  );
}

export default MentorActivitiesTable;
