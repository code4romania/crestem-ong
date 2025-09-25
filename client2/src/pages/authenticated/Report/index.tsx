import Heading from "@/components/Heading";
import Section from "@/components/Section";
import ReportInProgress from "@/pages/authenticated/Report/ReportInProgress";
import { useMemo } from "react";
import ReportResults from "./ReportResults";

import FullScreenLoader from "@/components/FullScreenLoader";
import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScoreByDimension } from "@/lib/score";
import { Route } from "@/routes/(app)/reports/$reportId";
import { useGetMatrix } from "@/services/matrix.queries";
import { useGetReportById } from "@/services/reports.queries";

const Report = () => {
  const { reportId } = Route.useParams();
  const { data: report } = useGetReportById(reportId);
  const { data: matrix, isLoading } = useGetMatrix();

  const evaluationsCompleted = useMemo(
    () =>
      report?.evaluations
        ? evaluationsCompletedFilter(report?.evaluations)
        : [],
    [report?.evaluations]
  );

  const scoreByEvaluation = useMemo(() => {
    return matrix && evaluationsCompleted.length > 0
      ? calcScoreByDimension({ evaluationsCompleted, matrix })
      : [];
  }, [evaluationsCompleted, matrix]);

  if (!report || isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Section>
      <header className="mb-10">
        <Heading level="h2">
          {report.finished
            ? `Evaluare ${new Date(report.createdAt).toLocaleDateString(
                "ro-RO",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}`
            : "Evaluare curentă"}
        </Heading>
      </header>
      {report.finished ? (
        <ReportResults
          evaluationsCompleted={evaluationsCompleted}
          report={report}
          scoreByEvaluation={scoreByEvaluation}
        />
      ) : (
        <ReportInProgress report={report} />
      )}
    </Section>
  );
};

export default Report;
