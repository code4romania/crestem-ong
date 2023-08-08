import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import RangeSlider from "react-range-slider-input";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import { useGetReportsQuery } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import TableRowReportFDSC from "@/components/TableRowReportFDSC";
import Input from "@/components/Input";
import { downloadExcel } from "react-export-table-to-excel";
import Button from "@/components/Button";
import { calcScore } from "@/lib/score";
import { evaluationsCompletedFilter } from "@/lib/filters";
import "react-range-slider-input/dist/style.css";

const ReportsList = () => {
  const { data: reports, isLoading } = useGetReportsQuery(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scoreRange, setScoreRange] = useState([0, 100]);

  const header = [
    "ID",
    "ONG",
    "DATĂ ÎNCEPUT",
    "DATĂ FINAL",
    "SCOR OBȚINUT",
    "NUMĂR COMPLETĂRI",
  ];

  const data = useMemo(
    () =>
      reports?.map(
        ({ id, user, createdAt, finished, deadline, evaluations }) => {
          const completedEvaluations = evaluationsCompletedFilter(evaluations);
          return {
            id,
            finished,
            ongName: user?.ongName,
            startDate: new Date(createdAt),
            endDate: new Date(deadline),
            score: calcScore(completedEvaluations) || 0,
            count: `${completedEvaluations.length} / ${evaluations.length}`,
            evaluations: evaluations,
          };
        }
      ),
    [reports]
  );

  const body = useMemo(
    () =>
      data?.map(
        ({ id, ongName, startDate, endDate, finished, score, count }) => {
          return {
            id,
            ongName: ongName,
            startDate: startDate.toLocaleString("ro-RO", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            endDate: finished
              ? endDate.toLocaleString("ro-RO", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "În progres",
            score: finished ? `${score}%` : "În progres",
            count: count,
          };
        }
      ),
    [data]
  );
  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };
  const handleChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };
  const handleChangeScore = (range: [number, number]) => {
    setScoreRange(range);
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

  const filtered = useMemo(() => {
    const results = data?.filter(
      (res) =>
        res.ongName?.toLowerCase().includes(searchTerm) &&
        (startDate ? res.startDate > new Date(startDate) : true) &&
        (endDate ? res.endDate > new Date(endDate) : true) &&
        res.score >= scoreRange[0] &&
        res.score <= scoreRange[1]
    );
    return results || data;
  }, [data, searchTerm, startDate, endDate, scoreRange]);

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
          <div className="flex items-center justify-between space-x-2.5">
            <div className="w-2/3">
              <label>Caută</label>
              <Input
                type="search"
                name="search"
                placeholder="Caută"
                onChange={handleChangeSearch}
              />
            </div>
            <div>
              <label>Dată înregistrare</label>
              <Input
                name="startDate"
                type="date"
                onChange={handleChangeStartDate}
              />
            </div>
            <div>
              <label>Dată final</label>
              <Input
                name="endDate"
                type="date"
                onChange={handleChangeEndDate}
              />
            </div>
            <div className="w-2/3">
              <label>Scor</label>
              <div className="h-5 mt-1 flex items-center">
                <RangeSlider
                  defaultValue={[0, 100]}
                  onInput={handleChangeScore}
                />
              </div>
              <div className="flex justify-between">
                <span>{scoreRange[0]}%</span> - <span>{scoreRange[1]}%</span>
              </div>
            </div>
          </div>
          <Button onClick={handleDownloadExcel}>Descarcă tabel</Button>
        </div>
        <table className="w-full table-auto divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {header.map((th) => (
                <th
                  key={th}
                  scope="col"
                  className="py-3.5 pl-4 pr-3 uppercase text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  {th}
                </th>
              ))}
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
                ongName={report.ongName}
                evaluations={report.evaluations}
                startDate={report.startDate}
                endDate={report.endDate}
                finished={report.finished}
              />
            ))}
          </tbody>
        </table>
      </Section>
    </>
  );
};

export default ReportsList;
