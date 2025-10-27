import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";
import { DataTableSkeleton } from "@/components/ui/data-table-skeleton";
import { useDeleteMentorshipRelationMutation } from "@/services/mentors.mutations";
import { useListMentorshipRelations } from "@/services/mentors.queries";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { mtnColumns } from "./mtn-columns";
import Confirm from "@/components/Confirm";

export function MentorsToNgosTable() {
  const [open, setOpen] = useState(false);
  const [selectedMentorshipRelationId, setSelectedMentorshipRelationId] =
    useState<number | null>(null);
  const { data: mentorshipRelations, isLoading } = useListMentorshipRelations();

  const { mutate: deleteMentorshipRelation } =
    useDeleteMentorshipRelationMutation();

  const deleteMentorshipRelationCallback = useCallback(() => {
    console.log(
      "deleteMentorshipRelationCallback",
      selectedMentorshipRelationId
    );
    if (!selectedMentorshipRelationId) return;
    deleteMentorshipRelation(selectedMentorshipRelationId, {
      onSuccess: () => {
        toast.success("Relația de mentorat a fost ștearsă.");
        setSelectedMentorshipRelationId(null);
        setOpen(false);
      },
      onError: () => {
        toast.error("Relația de mentorat nu a fost ștearsă.");
        setSelectedMentorshipRelationId(null);
        setOpen(false);
      },
    });
  }, [
    selectedMentorshipRelationId,
    deleteMentorshipRelation,
    setSelectedMentorshipRelationId,
    setOpen,
  ]);

  const memoColumns = useMemo(
    () =>
      mtnColumns((mentorshipRelationId: number) => {
        setSelectedMentorshipRelationId(mentorshipRelationId);
        setOpen(true);
      }),
    [setSelectedMentorshipRelationId, setOpen]
  );

  const table = useReactTable({
    data: mentorshipRelations ?? [],
    columns: memoColumns,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading)
    return (
      <DataTableSkeleton
        columnCount={mtnColumns.length}
        withPagination={false}
      />
    );
  return (
    <>
      <Confirm
        header="Șterge relația de mentorat"
        body="Ești sigur că vrei să ștergi relația de mentorat? Aceasta nu va mai fi disponibilă pentru vizualizare."
        buttonText="Șterge"
        open={open}
        setOpen={setOpen}
        handleComplete={deleteMentorshipRelationCallback}
        destructive={true}
      />
      <DataTable
        table={table}
        emptyMessage="Nu există relații de mentorat"
      ></DataTable>
    </>
  );
}
