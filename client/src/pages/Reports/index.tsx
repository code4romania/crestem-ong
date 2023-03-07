import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import TableRowReport from "../../components/TableRowReport";
import TableHeadReports from "../../components/index/TableHeadReports";
import Button from "../../components/Button";
import { useCreateReportMutation } from "../../redux/api/userApi";
import Heading from "../../components/Heading";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const user = useSelector((state) => state.userState.user);
  const navigate = useNavigate();

  const reports = user?.reports
    .map((report) => ({ ...report, createdAt: new Date(report.createdAt) }))
    .sort((a, b) => {
      return a.createdAt - b.createdAt;
    });

  const [submitReport, { data, isSuccess }] = useCreateReportMutation();

  const handleClickCreate = useCallback(() => {
    console.log("asd");
    submitReport(null);
  }, []);

  useEffect(() => {
    if (data) {
      navigate(`/reports/${data.id}`);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <TableHeadReports />
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {reports?.map((report) => {
                      return (
                        <TableRowReport
                          key={report.id}
                          id={report.id}
                          createdAt={report.createdAt}
                          deadline={report.deadline}
                          evaluations={report.evaluations}
                          finished={report.finished}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-teal-600/10 px-16 py-20 flex flex-col md:flex-row space-y-5 items-center">
          <div className="w-auto">
            <Heading level={"h2"}>Pregătit să reevaluezi organizația ?</Heading>
            <div className="text-teal-800">
              <Heading level={"h2"}>
                Începe o evaluare nouă pentru a vedea progresul!
              </Heading>
            </div>
          </div>
          <div className={"md:w-1/2 lg:w-1/3"}>
            <div className="float-right">
              <Button onClick={handleClickCreate}>Începe evaluarea</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
