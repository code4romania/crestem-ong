import React from "react";
import ResultsByDimension from "@/components/ResultsByDimension";
import TableEvaluations from "@/components/TableEvaluations";

const ReportResults = ({ report, scoreByEvaluation }) => {
  const startDate = new Date(report.createdAt).getTime();
  const endDate = new Date(report.deadline).getTime();

  const period = Math.ceil(
    Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)
  );
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
