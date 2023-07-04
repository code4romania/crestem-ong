import Stats from "@/components/Stats";
import { calcScore } from "@/lib/score";
import ResultsByDimension from "@/components/ResultsByDimension";
import TableEvaluations from "@/components/TableEvaluations";
import React, { useMemo } from "react";
import LibraryBanner from "@/components/LibraryBanner";
import { evaluationsCompletedFilter } from "@/lib/filters";

const ReportResults = ({ report }) => {
  const evaluationsCompleted = useMemo(
    () => evaluationsCompletedFilter(report?.evaluations),
    [report?.evaluations]
  );
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
      <ResultsByDimension evaluations={evaluationsCompleted} />
      <LibraryBanner />
      <div className="mt-10">
        <div className="font-medium text-lg mb-4">Invitații trimise</div>
        <TableEvaluations evaluations={report?.evaluations} />
      </div>
    </div>
  );
};

export default ReportResults;
