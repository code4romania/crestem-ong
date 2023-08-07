import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import { useGetReportsQuery } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import TableRowReportFDSC from "@/components/TableRowReportFDSC";
import Input from "@/components/Input";
import { Report } from "@/redux/api/types";
import { downloadExcel } from "react-export-table-to-excel";
import Button from "@/components/Button";
import { calcScore } from "@/lib/score";
import { evaluationsCompletedFilter } from "@/lib/filters";

const ReportsList = () => {
  const { data: reports, isLoading } = useGetReportsQuery(null);
  const [filtered, setFilterd] = useState([] as Report[]);
  const [searchTerm, setSearchTerm] = useState("");

  const header = [
    "ID",
    "ONG",
    "DATĂ ÎNCEPUT",
    "DATĂ FINAL",
    "SCOR OBȚINUT",
    "NUMĂR COMPLETĂRI",
  ];

  const body = reports?.map(
    ({ id, user, createdAt, finished, deadline, evaluations }) => {
      const completedEvaluations = evaluationsCompletedFilter(evaluations);
      return {
        id,
        ongName: user?.ongName,
        startDate: new Date(createdAt).toLocaleString("ro-RO", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        endDate: finished
          ? new Date(deadline).toLocaleString("ro-RO", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "În progres",
        score: finished
          ? `${calcScore(completedEvaluations) || "0"}%`
          : "În progres",
        count: `${completedEvaluations.length} / ${evaluations.length}`,
      };
    }
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDownloadExcel = useCallback(() => {
    if (header && body) {
      downloadExcel({
        fileName: "evaluari",
        sheet: "evaluari",
        tablePayload: {
          header,
          body,
        },
      });
    }
  }, [header, body]);

  useEffect(() => {
    const results = reports?.filter((res) =>
      res.user?.ongName?.toLowerCase().includes(searchTerm)
    );
    if (results) {
      setFilterd(results);
    }
  }, [reports, searchTerm]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <Section>
        <Heading level="h2">Evaluări</Heading>
      </Section>
      <Section>
        <div className="flex items-center justify-between mb-10">
          <div className="w-2/3">
            <Input
              name="search"
              placeholder="Caută"
              onChange={handleChange}
              value={searchTerm}
            />
          </div>
          <Button onClick={handleDownloadExcel}>Descarcă tabel</Button>
        </div>
        <table className="w-full table-auto divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 uppercase text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                ID
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 uppercase text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                ONG
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 uppercase text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Dată Început
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 uppercase text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Dată FINAL
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 uppercase text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                SCOR OBȚINUT
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 uppercase text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                NUMĂR COMPLETĂRI
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 uppercase text-left text-sm font-semibold text-gray-900 sm:pl-6"
              ></th>
            </tr>
          </thead>
          <tbody>
            {filtered?.map((report) => (
              <TableRowReportFDSC
                key={report.id}
                id={report.id}
                evaluations={report.evaluations}
                createdAt={report.createdAt}
                deadline={report.deadline}
                finished={report.finished}
                user={report.user}
              />
            ))}
          </tbody>
        </table>
      </Section>
    </>
  );
};

export default ReportsList;
