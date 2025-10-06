import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Suspense } from "react";
import { MentorsPrimaryButtons } from "./components/primary-buttons";
import { MentorsTable } from "./components/table";
import FullScreenLoader from "@/components/FullScreenLoader";

const Mentors = () => {
  return (
    <>
      <Section>
        <div className="flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <Heading level={"h2"}>Persoane resursă</Heading>
          </div>
          <MentorsPrimaryButtons />
        </div>
      </Section>
      <Section>
        <Suspense fallback={<FullScreenLoader />}>
          <MentorsTable />
        </Suspense>
      </Section>
    </>
  );
};

export default Mentors;
