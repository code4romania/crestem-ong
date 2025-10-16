import LibraryBanner from "@/components/LibraryBanner";
import ResultsByDimension from "@/components/ResultsByDimension";
import Stats from "@/components/Stats";
import TableEvaluations from "@/components/TableEvaluations";
import { calcScore } from "@/lib/score";
import type {
  FinalEvaluationModel,
  FinalReportModel,
} from "@/services/api/types";
export interface ReportResultsProps {
  report: FinalReportModel;
  evaluationsCompleted: FinalEvaluationModel[];
  scoreByEvaluation: {
    id: string;
    name: string;
    link: string | undefined;
    score: number;
    tags: string[];
  }[];
}

const ReportResults = ({
  report,
  evaluationsCompleted,
  scoreByEvaluation,
}: ReportResultsProps) => {
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
      <ResultsByDimension scoreByEvaluation={scoreByEvaluation} />
      <LibraryBanner />
      <div className="mt-10">
        <div className="font-medium text-lg mb-4">Invitații trimise</div>
        <TableEvaluations report={report} />
      </div>
    </div>
  );
};

export default ReportResults;
