import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import ProgramsTable from "./ProgramsTable";

const ProgramsList = () => {
  return (
    <div>
      <Section>
        <Heading level={"h2"}>Programe</Heading>
      </Section>
      <Section>
        <ProgramsTable />
      </Section>
    </div>
  );
};

export default ProgramsList;
