import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Suspense } from "react";
import { ReportsPrimaryButtons } from "./components/primary-buttons";
import { ReportsTable } from "./components/table";
import FullScreenLoader from "@/components/FullScreenLoader";

const ReportsList = () => {
  return (
    <div>
      <Section>
        <div className="flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <Heading level={"h2"}>Programe</Heading>
          </div>
          <ReportsPrimaryButtons />
        </div>
      </Section>
      <Section>
        <Suspense fallback={<FullScreenLoader />}>
          <ReportsTable />
        </Suspense>
      </Section>
    </div>
  );
};

export default ReportsList;
