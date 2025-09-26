import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { useMemo } from "react";
import ReportResults from "./ReportResults";

import FullScreenLoader from "@/components/FullScreenLoader";
import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScoreByDimension } from "@/lib/score";
import { Route } from "@/routes/(app)/reports/$reportId";
import { useGetMatrix } from "@/services/matrix.queries";
import { useSuspenseGetReportById } from "@/services/reports.queries";
import formatDate from "@/lib/formatDate";

const Report = () => {
  const { reportId } = Route.useParams();
  const { data: report, isPending: isLoadingreport } =
    useSuspenseGetReportById(reportId);
  const { data: matrix, isPending: isLoadingMatrix } = useGetMatrix();

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

  if (!isLoadingMatrix || isLoadingreport) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <Section>
        <header className="mb-10">
          <Heading level="h2">
            Evaluare
            {formatDate(report.createdAt)}
          </Heading>
        </header>
      </Section>
      <Section className="pb-12">
        <ReportResults
          evaluationsCompleted={evaluationsCompleted}
          report={report}
          scoreByEvaluation={scoreByEvaluation}
        />
      </Section>
    </>
  );
};

export default Report;
