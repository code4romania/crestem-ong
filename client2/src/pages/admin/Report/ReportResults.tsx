import ResultsByDimension from "@/components/ResultsByDimension";
import TableEvaluations from "@/components/TableEvaluations";
import type { FinalReportModel } from "@/services/api/types";
export interface ReportResultsProps {
  report: FinalReportModel;
  scoreByEvaluation: {
    id: string;
    name: string;
    link: string;
    score: number;
    tags: string[];
  }[];
}
const ReportResults = ({ report, scoreByEvaluation }: ReportResultsProps) => {
  return (
    <div>
      <ResultsByDimension scoreByEvaluation={scoreByEvaluation} />
      <div className="mt-10">
        <div className="font-medium text-lg mb-4">Completări evaluare</div>
        <TableEvaluations report={report} />
      </div>
    </div>
  );
};

export default ReportResults;
