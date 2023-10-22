import React, { useCallback, useMemo, useState } from "react";
import Button from "@/components/Button";
import { DonutChart } from "react-circle-chart";
import CreateEvaluation from "@/components/CreateEvaluation";
import TableEvaluations from "@/components/TableEvaluations";
import Confirm from "@/components/Confirm";
import { useUpdateReportMutation } from "@/redux/api/userApi";

const CallToAction = ({ reportId }: { reportId: number }) => {
  const [updateReport] = useUpdateReportMutation();
  const [open, setOpen] = useState(false);

  const handleComplete = useCallback(() => {
    updateReport({ id: reportId, finished: true });
  }, [reportId]);

  return (
    <>
      <Confirm
        header="Ești sigur că vrei să finalizezi evaluarea?"
        body="Dacă finalizezi acum, persoanele care nu au răspuns la chestionarul de evaluare nu vor putea să mai completeze.
Asigură-te că ai toate răspunsurile înainte de a face această acțiune"
        buttonText="Finalizează evaluarea"
        open={open}
        setOpen={setOpen}
        handleComplete={handleComplete}
      />
      <Button onClick={() => setOpen(true)}>Finalizează evaluare</Button>
    </>
  );
};

const ReportInProgress = ({ report }) => {
  const reportId = report.id;
  const evaluationsCompleted = useMemo(
    () =>
      report?.evaluations?.filter(({ dimensions }) => dimensions.length === 10),
    [report?.evaluations]
  );
  const canFinish = evaluationsCompleted.length > 0;

  return (
    <div>
      <div className={"divide-y divide-gray-300 mb-10"}>
        <div className={"flex justify-between mb-4"}>
          <div>Detalii evaluare</div>
          {canFinish && (
            <div className={"hidden md:block"}>
              <CallToAction reportId={reportId} />
            </div>
          )}
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
            <div className="flex mt-4 space-x-8">
              {report.createdAt && (
                <div>
                  <div className="text-sm leading-5 font-medium">
                    Data de început:
                  </div>
                  <div className="mt-2.5">
                    {new Date(report.createdAt).toLocaleDateString("ro-RO", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
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
        <div className="my-10 md:max-w-xl">
          <CreateEvaluation reportId={reportId} />
        </div>
        <TableEvaluations evaluations={report.evaluations} />
      </div>
      {canFinish && (
        <div className={"md:hidden mt-4"}>
          <CallToAction reportId={reportId} />
        </div>
      )}
    </div>
  );
};

export default ReportInProgress;
