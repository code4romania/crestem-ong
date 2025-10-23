import { DataTable } from "@/components/ui/data-table";
import { useListNgoMentorActivities } from "@/services/activities.queries";
import type { FinalDetailedUserModel } from "@/services/api/types";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { activitiesColumns } from "./activities-columns";
import type { MentorActivityVM } from "./type";

function MentorActivitiesTable({ ngo }: { ngo: FinalDetailedUserModel }) {
  const { data: activities } = useListNgoMentorActivities(
    ngo.id,
    (activities): MentorActivityVM[] =>
      activities.map((activity) => ({
        id: activity.id,
        createdAt: activity.createdAt,
        startDate: activity.startDate,
        duration: activity.duration,
        dimension: activity.dimension,
        type: activity.type,
        mentor: activity.mentor,
      })) ?? []
  );

  console.log(activities);

  const downloadTable = useCallback((activity: MentorActivityVM) => {
    // downloadExcel({
    //   fileName: "evaluari",
    //   sheet: "evaluari",
    //   tablePayload: {
    //     header: ["Date Generale"],
    //     body: [
    //       ["Nume ONG:", ngo.ongName],
    //       ["CIF:", ngo.ongIdentificationNumber],
    //       ["Dată început", formatDate(report.createdAt)],
    //       ["Dată final", formatDate(report.deadline)],
    //       ["Scor obținut", report.score],
    //       ["Număr completări", report.numberOfCompletedEvaluations],
    //       [
    //         "Nume persoană de contact organizație:",
    //         [ngo.contactFirstName, ngo.contactLastName]
    //           .filter(Boolean)
    //           .join(" ") ?? "-",
    //       ],
    //       ["Email persoană de contact organizație:", ngo.contactEmail ?? "-"],
    //       ["Program", ngo.program?.name ?? "-"],
    //       [
    //         "Expert alocat (persoană resursă FDSC):",
    //         [ngo.mentor?.firstName, ngo.mentor?.lastName]
    //           .filter(Boolean)
    //           .join(" ") ?? "-",
    //       ],
    //       [],
    //       ["Rezultate Generale pe dimensiuni"],
    //       ...calcScoreByDimension({
    //         matrix,
    //         evaluationsCompleted: report.completedEvaluations,
    //       }).map((dimension) => [
    //         dimension.name,
    //         dimension.score?.toFixed(2) || "-",
    //       ]),
    //       [
    //         "",
    //         ...report.completedEvaluations.map(
    //           (e, idx) => `Evaluare ${idx + 1}`
    //         ),
    //       ],
    //       ["", ...report.completedEvaluations.map((e) => e.email)],
    //       ...getDimensionsData(matrix.dimensions, report.completedEvaluations),
    //     ],
    //   },
    // });
  }, []);

  const columns = useMemo(() => activitiesColumns(ngo.id), [ngo]);

  const table = useReactTable({
    data: activities ?? [],
    columns,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} />;
}

export default MentorActivitiesTable;
