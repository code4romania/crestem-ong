import React, { ChangeEvent } from "react";
import UsersTable from "@/pages/Home/UsersTable";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Input from "@/components/Input";

const UsersList = () => {
  return (
    <>
      <Section>
        <Heading level={"h2"}>Organizații</Heading>
      </Section>
      <Section>
        <UsersTable />
      </Section>
    </>
  );
};

export default UsersList;
