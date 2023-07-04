import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import { useGetReportsQuery } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import TableRowReportFDSC from "@/components/TableRowReportFDSC";
import Input from "@/components/Input";
import { User } from "@/redux/api/types";

const ReportsList = () => {
  const { data: reports, isLoading } = useGetReportsQuery(null);
  const [filtered, setFilterd] = useState([] as User[]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event: ChangeEvent) => {
    setSearchTerm(event.target.value);
  };

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
        <div className="mb-10">
          <Input
            placeholder="Caută"
            onChange={handleChange}
            value={searchTerm}
          />
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
