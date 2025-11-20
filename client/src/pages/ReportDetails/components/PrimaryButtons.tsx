import { Button } from "@/components/ui/button";
import { exportReport } from "@/lib/reports";
import { Route } from "@/routes/(app)/reports/$reportId";
import type {
  FinalDetailedUserModel,
  FinalReportModel,
} from "@/services/api/types";
import { useSuspenseGetMatrix } from "@/services/matrix.queries";
import { useSuspenseGetReportById } from "@/services/reports.queries";
import { Link } from "@tanstack/react-router";
import { DownloadIcon } from "lucide-react";
import { useCallback } from "react";
import { calcScore } from "@/lib/score";
import type { ReportVM } from "@/pages/NgoDetails/components/type";

export function ReportPrimaryButtons() {
  const { fromNgoId } = Route.useSearch();
  const { data: matrix } = useSuspenseGetMatrix();
  const { reportId } = Route.useParams();
  const { data: report } = useSuspenseGetReportById(reportId);

  const downloadEvaluation = useCallback(
    () =>
      exportReport(
        report?.user as FinalDetailedUserModel,
        matrix,
        toReportVM(report)
      ),
    [matrix, report]
  );
  return (
    <div className="flex gap-2">
      <Button asChild variant="secondary">
        {fromNgoId ? (
          <Link to={`/users/$userId`} params={{ userId: fromNgoId.toString() }}>
            Înapoi
          </Link>
        ) : (
          <Link to="/reports">Înapoi</Link>
        )}
      </Button>

      <Button onClick={() => downloadEvaluation()}>
        <DownloadIcon className="w-4 h-4" />
        <span>Descarca evaluare</span>
      </Button>
    </div>
  );
}
function toReportVM(report: FinalReportModel): ReportVM {
  const completedEvaluations = report.evaluations
    ? report.evaluations.filter(({ dimensions }) => dimensions.length === 10)
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
}
