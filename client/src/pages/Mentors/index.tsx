import React from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { useGetMentorsQuery } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";

const Mentors = () => {
  const { data, isLoading } = useGetMentorsQuery();

  if (isLoading) {
    return <FullScreenLoader></FullScreenLoader>;
  }

  return (
    <div>
      <Section>
        <Heading level={"h2"}>Persoane resursa</Heading>
        <Table
          head={[
            "Nume",
            "Specializare",
            "Disponibilitate",
            "Program asociat",
            "Ultima activitate",
          ]}
          body={data.map((mentor) => [
            `${mentor.firstName} ${mentor.lastName}`,
            `${mentor.dimensions.map((dimension) => dimension.name)}`,
            "Disponibil",
            `${mentor.programs.map((program) => program.name)}`,
            `${
              (mentor.activities &&
                mentor.activities[mentor.activities?.length - 1]?.createdAt) ||
              "-"
            } `,
          ])}
          button={
            <Button to={"/create/mentor"}>Adaugă persoană resursă</Button>
          }
        />
      </Section>
    </div>
  );
};

export default Mentors;
