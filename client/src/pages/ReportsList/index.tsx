import React, { useMemo } from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import { useGetReportsQuery } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import TableRowReportFDSC from "@/components/TableRowReportFDSC";

const ReportsList = () => {
  const { data: reports, isLoading } = useGetReportsQuery(null);
  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <Section>
        <Heading level="h2">Evaluări</Heading>
      </Section>
      <Section>
        <table className="w-full table-auto divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                ID
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                ONG
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Dată Început
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Dată FINAL
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                SCOR OBȚINUT
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                NUMĂR COMPLETĂRI
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              ></th>
            </tr>
          </thead>
          <tbody>
            {reports?.map((report) => (
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
