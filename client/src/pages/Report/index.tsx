import React from "react";
import { useParams } from "react-router-dom";
import { useFindReportQuery } from "@/redux/api/userApi";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import ReportResults from "./ReportResults";
import ReportInProgress from "@/pages/Report/ReportInProgress";

const Report = () => {
  const { reportId } = useParams();
  const { data: report } = useFindReportQuery(reportId);

  if (!report) {
    return <></>;
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
        <ReportResults report={report} />
      ) : (
        <ReportInProgress report={report} />
      )}
    </Section>
  );
};

export default Report;
