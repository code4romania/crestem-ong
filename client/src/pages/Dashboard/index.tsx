import React from "react";
import Heading from "@/components/Heading";
import Stats from "@/components/Stats";
import Section from "@/components/Section";
import {
  useGetEvaluationsCountQuery,
  useGetReportsQuery,
  useGetUsersQuery,
} from "@/redux/api/userApi";
import { evaluationsCompletedFilter } from "@/lib/filters";

const Dashboard = () => {
  const { data: reports } = useGetReportsQuery(null);
  const { data: users } = useGetUsersQuery();
  const { data: evaluations } = useGetEvaluationsCountQuery();

  return (
    <Section className="py-4">
      <div className={"mb-10"}>
        <Heading level={"h2"}>Panou de control</Heading>
      </div>
      <Stats
        data={[
          { label: "Total evaluări create", value: reports?.length },
          { label: "Total organizații în platformă", value: users?.length },
          {
            label: "Total completări evaluare",
            value:
              evaluations && evaluationsCompletedFilter(evaluations).length,
          },
        ]}
      />
    </Section>
  );
};

export default Dashboard;
