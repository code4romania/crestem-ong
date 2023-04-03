import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import {
  useFindReportQuery,
  useUpdateReportMutation,
} from "@/redux/api/userApi";
import TableEvaluations from "@/components/TableEvaluations";
import CreateEvaluation from "@/components/CreateEvaluation";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import { DonutChart } from "react-circle-chart";
import ReportResults from "./ReportResults";
import ReportInProgress from "@/pages/Report/ReportInProgress";

const Report = () => {
  const [isFinished, setIsFinished] = useState(false);
  const { reportId } = useParams();

  const { data: report } = useFindReportQuery(reportId);

  if (!report) {
    return false;
  }
  const evaluationsCompleted = report?.evaluations?.filter(
    ({ dimensions }) => dimensions.length === 10
  );

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
        <ReportResults report={report} />
      ) : (
        <ReportInProgress report={report} />
      )}
    </Section>
  );
};

export default Report;
