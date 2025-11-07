import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScoreByDimension } from "@/lib/score";
import ReportDetails from "@/pages/admin/Report/ReportDetails";
import { Route } from "@/routes/(app)/reports/$reportId";
import { useSuspenseGetReportById } from "@/services/reports.queries";
import { useMemo } from "react";
import ReportResults from "./ReportResults";
import { useGetMatrix } from "@/services/matrix.queries";

const Report = () => {
  const { reportId } = Route.useParams();
  const { data: report } = useSuspenseGetReportById(reportId);
  const { data: matrix } = useGetMatrix();

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

  return (
    <>
      <Section>
        <header>
          <Heading level="h2">Evaluare #{reportId}</Heading>
        </header>
      </Section>
      <Section>
        <ReportDetails
          report={report}
          evaluationsCompleted={evaluationsCompleted}
          scoreByEvaluation={scoreByEvaluation}
        />
      </Section>
      <Section>
        <ReportResults report={report} scoreByEvaluation={scoreByEvaluation} />
      </Section>
    </>
  );
};

export default Report;
