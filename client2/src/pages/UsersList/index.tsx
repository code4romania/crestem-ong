import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Suspense } from "react";
import { NgosPrimaryButtons } from "./components/primary-buttons";
import { NgosTable } from "./components/table";

const UsersList = () => {
  return (
    <>
      <Section>
        <div className="flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <Heading level={"h2"}>Organizații</Heading>
          </div>
          <NgosPrimaryButtons />
        </div>
      </Section>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
        <Suspense fallback={<div>Loading...</div>}>
          <NgosTable />
        </Suspense>
      </div>
    </>
  );
};

export default UsersList;
