import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScore, calcScoreByDimension } from "@/lib/score";
import ReportDetails from "@/pages/ReportDetails/components/ReportDetails";
import { Route } from "@/routes/(app)/reports/$reportId";
import { useGetMatrix } from "@/services/matrix.queries";
import { useSuspenseGetReportById } from "@/services/reports.queries";
import { useMemo } from "react";
import { ReportPrimaryButtons } from "./components/PrimaryButtons";
import ReportResults from "./components/ReportResults";
import Stats from "@/components/Stats";

const ReportDetailsPage = () => {
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

  const startDate = new Date(report.createdAt).getTime();
  const endDate = new Date(report.deadline).getTime();

  const period = Math.ceil(
    Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <Section>
        <div className="flex justify-between items-center">
          <Heading level="h2">Evaluare #{reportId}</Heading>
          <ReportPrimaryButtons />
        </div>
      </Section>
      <Section>
        <ReportDetails
          report={report}
          evaluationsCompleted={evaluationsCompleted}
          scoreByEvaluation={scoreByEvaluation}
        />
      </Section>
      <Section>
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
      </Section>
      <Section>
        <ReportResults report={report} scoreByEvaluation={scoreByEvaluation} />
      </Section>
    </>
  );
};

export default ReportDetailsPage;
