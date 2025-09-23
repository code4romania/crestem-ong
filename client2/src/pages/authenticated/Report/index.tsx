import React, { useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { useFindReportQuery, userApi } from "@/redux/api/userApi";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import ReportResults from "./ReportResults";
import ReportInProgress from "@/pages/authenticated/Report/ReportInProgress";
import { useGetMe } from "@/services/user.queries";

import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScoreByDimension } from "@/lib/score";
import FullScreenLoader from "@/components/FullScreenLoader";

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
