import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/Button";
import Stats from "@/components/Stats";
import { calcScore } from "@/lib/score";
import ResultsByDimension from "@/components/ResultsByDimension";
import {
  useFindReportQuery,
  useUpdateReportMutation,
} from "@/redux/api/userApi";
import TableEvaluations from "@/components/TableEvaluations";
import CreateEvaluation from "@/components/CreateEvaluation";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import { DonutChart } from "react-circle-chart";

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
      ) : (
        <div>
          <div className={"divide-y divide-gray-300 mb-10"}>
            <div className={"flex justify-between mb-4"}>
              <div>Detalii evaluare</div>
              <div className={"hidden md:block"}>
                <Button onClick={handleComplete}>Finalizează evaluare</Button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row py-6 space-y-4">
              <div className="flex flex-col items-center md:w-1/3">
                <DonutChart
                  size={"sm"}
                  trackColor="#688F2380"
                  totalTextColor="#047B7D"
                  tooltipSx={{
                    display: "none",
                  }}
                  items={[
                    {
                      label: "Formulare completate",
                      color: "#047B7D",
                      value: Math.floor(
                        (evaluationsCompleted?.length * 100) /
                          report?.evaluations?.length || 0
                      ),
                    },
                  ]}
                />
                <div className="flex text-sm space-x-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-teal-600 mr-2" />
                    <div>Formulare completate</div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: "rgba(104, 143, 35, 0.5)" }}
                    />
                    <div>Formulare necompletate</div>
                  </div>
                </div>
              </div>
              <div className={"md:w-2/3"}>
                <div className="text-base leading-6 font-medium mb-2">
                  Perioada de evaluare
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi, totam at reprehenderit maxime aut beatae ad.
                </p>
                <div className="flex mt-4 space-x-8">
                  {report.createdAt && (
                    <div>
                      <div className="text-sm leading-5 font-medium">
                        Data de început:
                      </div>
                      <div className="mt-2.5">
                        {new Date(report.createdAt).toLocaleDateString(
                          "ro-RO",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  )}
                  {report.deadline && (
                    <div>
                      <div className="text-sm leading-5 font-medium">
                        Data de final:
                      </div>
                      <div className="mt-2.5">
                        {new Date(report.deadline).toLocaleDateString("ro-RO", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={"divide-y divide-gray-300"}>
            {reportId && (
              <div className="my-10 md:max-w-xl">
                <CreateEvaluation reportId={reportId} />
              </div>
            )}
            <TableEvaluations evaluations={report.evaluations} />
          </div>
          <div className={"md:hidden mt-4"}>
            <Button onClick={handleComplete}>Finalizează evaluare</Button>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Report;
