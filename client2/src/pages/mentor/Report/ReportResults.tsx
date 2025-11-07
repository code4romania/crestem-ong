import ResultsByDimension from "@/components/ResultsByDimension";
import Stats from "@/components/Stats";
import { calcScore } from "@/lib/score";
import type {
  FinalEvaluationModel,
  FinalReportModel,
} from "@/services/api/types";
// import { Evaluation, Report } from "@/redux/api/types";

const ReportResults = ({
  report,
  evaluationsCompleted,
  scoreByEvaluation,
}: {
  report: FinalReportModel;
  evaluationsCompleted: FinalEvaluationModel[];
  scoreByEvaluation?: {
    id: string;
    name: string;
    link: string;
    score: number;
    tags: string[];
  }[];
}) => {
  const startDate = new Date(report.createdAt).getTime();
  const endDate = new Date(report.deadline).getTime();

  const period = Math.ceil(
    Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)
  );
  return (
    <div>
      <Stats
        data={[
          {
            label: "Perioadă de completare",
            value: `${period} zile`,
          },
          {
            label: "Total completări",
            value: `${evaluationsCompleted.length || 0}`,
          },
          {
            label: " Scor total",
            value: `${calcScore(evaluationsCompleted) || 0}%`,
          },
        ]}
      />
      {scoreByEvaluation && (
        <ResultsByDimension scoreByEvaluation={scoreByEvaluation} />
      )}
    </div>
  );
};

export default ReportResults;
