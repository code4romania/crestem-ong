import React from "react";
import UsersTable from "@/pages/Home/UsersTable";
import Heading from "@/components/Heading";
import Section from "@/components/Section";

const UsersList = () => (
  <>
    <Section>
      <Heading level={"h2"}>Utilizatori</Heading>
    </Section>
    <Section>
      <UsersTable />
    </Section>
  </>
);

export default UsersList;
