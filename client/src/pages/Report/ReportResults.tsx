import Stats from "@/components/Stats";
import { calcScore } from "@/lib/score";
import ResultsByDimension from "@/components/ResultsByDimension";
import TableEvaluations from "@/components/TableEvaluations";
import React, { useMemo } from "react";

const ReportResults = ({ report }) => {
  const evaluationsCompleted = useMemo(
    () =>
      report?.evaluations?.filter(({ dimensions }) => dimensions.length === 10),
    [report?.evaluations]
  );
  return (
    <div>
      <Stats
        period={Math.ceil(
          Math.abs(new Date(report.deadline) - new Date(report.createdAt)) /
            (1000 * 60 * 60 * 24)
        )}
        count={evaluationsCompleted.length}
        score={calcScore(evaluationsCompleted)}
      />
      <ResultsByDimension evaluations={evaluationsCompleted} />
      <div className="mt-10">
        <div className="font-medium text-lg mb-4">Invitații trimise</div>
        <TableEvaluations evaluations={report?.evaluations} />
      </div>
    </div>
  );
};

export default ReportResults;
