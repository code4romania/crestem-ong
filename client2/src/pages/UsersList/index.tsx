import Heading from "@/components/Heading";
import Section from "@/components/Section";
import UsersTable from "@/pages/Home/UsersTable";

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
