import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { MentorsPrimaryButtons } from "./components/mentors-primary-buttons";
import { MentorsTable } from "./components/mentors-table";
import { MentorsToNgosTable } from "./components/mtn-table";
import MtnPrimaryButtons from "./components/mtn-primary-buttons";

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
        <MentorsTable />
      </Section>
      <Section>
        <div className="flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <Heading level={"h2"}>Organizații si mentori</Heading>
          </div>
          <MtnPrimaryButtons />
        </div>
      </Section>
      <Section>
        <MentorsToNgosTable />
      </Section>
    </>
  );
};

export default Mentors;
