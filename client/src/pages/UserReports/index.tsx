import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserReportsQuery } from "@/redux/api/userApi";
import TableHeadReports from "@/components/index/TableHeadReports";
import Section from "@/components/Section";
import TableRowReport from "@/components/TableRowReport";

const UserReports = () => {
  const { userId } = useParams();
  const { data: user } = useGetUserReportsQuery({ userId });

  return (
    <Section>
      <table className="w-full">
        <TableHeadReports />
        <tbody className="divide-y divide-gray-200 bg-white">
          {user?.reports?.map((report) => {
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
    </Section>
  );
};

export default UserReports;
