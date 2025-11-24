import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Suspense } from "react";
import { ProgramsTable } from "./components/table";
import { ProgramsPrimaryButtons } from "./components/primary-buttons";
import FullScreenLoader from "@/components/FullScreenLoader";

const ProgramsList = () => {
  return (
    <div>
      <Section>
        <div className="flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <Heading level={"h2"}>Programe</Heading>
          </div>
          <ProgramsPrimaryButtons />
        </div>
      </Section>
      <Section>
        <Suspense fallback={<FullScreenLoader />}>
          <ProgramsTable />
        </Suspense>
      </Section>
    </div>
  );
};

export default ProgramsList;
