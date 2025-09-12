import React from "react";
import Stats from "@/components/Stats";
import { calcScore } from "@/lib/score";
import ResultsByDimension from "@/components/ResultsByDimension";
import { Evaluation, Report } from "@/redux/api/types";

const ReportResults = ({
  report,
  evaluationsCompleted,
  scoreByEvaluation,
}: {
  report: Report;
  evaluationsCompleted: Evaluation[];
  scoreByEvaluation?: {
    id: string;
    name: string;
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
