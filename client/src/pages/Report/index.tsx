import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import Stats from "@/components/Stats";
import { calcScore } from "@/lib/score";
import ResultsByDimension from "@/components/ResultsByDimension";
import {
  useCreateEvaluationMutation,
  useFindReportQuery,
  useUpdateReportMutation,
} from "@/redux/api/userApi";
import envelope from "@/assets/envelope.svg";
import TableEvaluations from "@/components/TableEvaluations";
import CreateEvaluation from "@/components/CreateEvaluation";
import Section from "@/components/Section";
import Heading from "@/components/Heading";

const Report = () => {
  const [isFinished, setIsFinished] = useState(false);
  const { reportId } = useParams();

  const { data: report } = useFindReportQuery(reportId);
  const [updateReport] = useUpdateReportMutation();

  useEffect(() => {
    if (report?.finished) {
      setIsFinished(true);
    }
  }, [report?.finished]);

  const handleComplete = useCallback(() => {
    setIsFinished(true);
    updateReport({ id: reportId, finished: true });
  }, [setIsFinished]);

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
          {isFinished
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
      {isFinished ? (
        <div>
          <Stats
            period={30}
            count={evaluationsCompleted.length}
            score={calcScore(evaluationsCompleted)}
          />
          <ResultsByDimension evaluations={evaluationsCompleted} />
          <div className="mt-10">
            <div className="font-medium text-lg">Invitații trimise</div>
            <TableEvaluations evaluations={report?.evaluations} />
          </div>
        </div>
      ) : (
        <div>
          <div className={"divide-y divide-gray-300 mb-10"}>
            <div className={"flex justify-between mb-4"}>
              <div>Detalii evaluare</div>
              <Button onClick={handleComplete}>Finalizează evaluare</Button>
            </div>
            <div>
              <div>
                formulare necompletate:{" "}
                {report?.evaluations?.length - evaluationsCompleted?.length}
              </div>
              <div>
                formulare completate:
                {evaluationsCompleted?.length}
              </div>
            </div>
          </div>
          <div className={"divide-y divide-gray-300"}>
            {reportId && (
              <div>
                <div>Invită membrii organizației</div>
                <CreateEvaluation reportId={reportId} />
              </div>
            )}
            {report?.evaluations.length > 0 ? (
              <TableEvaluations evaluations={report.evaluations} />
            ) : (
              <div className={"flex flex-col items-center"}>
                <img src={envelope} />
                <h3 className={"text-2xl text-gray-900 font-bold mt-6 mb-2"}>
                  Niciun membru invitat
                </h3>
                <p className="max-w-xl text-center text-gray-500 text-lg">
                  Adaugă adresele de email ale membrilor organizației pentru a-i
                  invita să completeze evaluarea
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
};

export default Report;
