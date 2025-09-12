import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFindReportQuery, userApi } from "@/redux/api/userApi";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import ReportResults from "./ReportResults";
import ReportDetails from "@/pages/admin/Report/ReportDetails";
import { evaluationsCompletedFilter } from "@/lib/filters";
import { useAppSelector } from "@/redux/store";
import FullScreenLoader from "@/components/FullScreenLoader";
import { calcScoreByDimension } from "@/lib/score";

const Report = () => {
  const { reportId } = useParams();
  const { data: report } = useFindReportQuery(reportId);
  const matrix = useAppSelector((state) => state.userState.matrix);
  const { isLoading } = userApi.endpoints.getMatrix.useQuery(null, {
    skip: !!matrix,
    refetchOnMountOrArgChange: true,
  });

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
    <>
      <Section>
        <header className="mb-10">
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
