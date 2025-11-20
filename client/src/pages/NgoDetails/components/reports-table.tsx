import { DataTable } from "@/components/ui/data-table";
import { exportReport } from "@/lib/reports";
import { calcScore } from "@/lib/score";
import type {
  FinalDetailedUserModel,
  FinalReportModel,
} from "@/services/api/types";
import { useSuspenseGetMatrix } from "@/services/matrix.queries";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { reportsColumns } from "./reports-columns";
import type { ReportVM } from "./type";

function NgoReportsTable({
  ngo,
  reports,
}: {
  ngo: FinalDetailedUserModel;
  reports?: FinalReportModel[];
}) {
  const { data: matrix } = useSuspenseGetMatrix();
  const data = useMemo(() => {
    return (
      reports
        ?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((report) => {
          const completedEvaluations = report.evaluations
            ? report.evaluations.filter(
                ({ dimensions }) => dimensions.length === 10
              )
            : [];

          return {
            id: report.id,
            createdAt: report.createdAt,
            deadline: report.deadline,
            finished: report.finished,
            numberOfCompletedEvaluations: completedEvaluations.length,
            totalEvaluations: report.evaluations.length,
            completedEvaluations,
            score:
              completedEvaluations.length > 0
                ? report.finished
                  ? `${calcScore(completedEvaluations)}%`
                  : "-"
                : "-",
          };
        }) ?? []
    );
  }, [reports]);

  const downloadEvaluation = useCallback(
    (report: ReportVM) => exportReport(ngo, matrix, report),
    [ngo, matrix]
  );

  const columns = useMemo(
    () => reportsColumns(ngo.id, downloadEvaluation),
    [ngo, downloadEvaluation]
  );

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable table={table} emptyMessage="Nu există evaluări"></DataTable>
  );
}

export default NgoReportsTable;
