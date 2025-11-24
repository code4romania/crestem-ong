import React from "react";
import Heading from "@/components/Heading";
import Stats from "@/components/Stats";
import Section from "@/components/Section";

import { evaluationsCompletedFilter } from "@/lib/filters";
import { useSuspenseListReports } from "@/services/reports.queries";
import { useListNgos } from "@/services/ngos.queries";
import { useListEvaluations } from "@/services/evaluation.queries";

const Home = () => {
  const { data: reports } = useSuspenseListReports(
    (d) => d.meta.pagination.total
  );
  const { data: users } = useListNgos();
  const { data: evaluations } = useListEvaluations();

  return (
    <Section className="py-4">
      <div className={"mb-10"}>
        <Heading level={"h2"}>Panou de control</Heading>
      </div>
      <Stats
        data={[
          { label: "Total evaluări create", value: reports },
          { label: "Total organizații în platformă", value: users?.length },
          {
            label: "Total completări evaluare",
            value:
              evaluations &&
              evaluationsCompletedFilter(evaluations.data).length,
          },
        ]}
      />
    </Section>
  );
};

export default Home;
