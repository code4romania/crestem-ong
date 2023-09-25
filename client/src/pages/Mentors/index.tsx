import React from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { useGetMentorsQuery } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import empty from "@/assets/empty.svg";
import EmptyScreen from "@/components/EmptyScreen";

const Mentors = () => {
  const { data: mentors, isLoading } = useGetMentorsQuery();

  if (isLoading) {
    return <FullScreenLoader></FullScreenLoader>;
  }

  return (
    <div>
      <Section>
        <Heading level={"h2"}>Persoane resursă</Heading>
        {mentors.length > 0 ? (
          <Table
            head={[
              "Nume",
              "Specializare",
              "Disponibilitate",
              "Program asociat",
              "Ultima activitate",
            ]}
            body={mentors.map((mentor) => [
              `${mentor.firstName} ${mentor.lastName}`,
              `${mentor.dimensions?.map((dimension) => dimension.name)}`,
              "Disponibil",
              `${mentor?.program?.name}`,
              `${
                (mentor.mentorActivities &&
                  mentor.mentorActivities[mentor.mentorActivities?.length - 1]
                    ?.createdAt) ||
                "-"
              } `,
            ])}
            button={
              <Button to={"/create/mentor"}>Adaugă persoană resursă</Button>
            }
          />
        ) : (
          <EmptyScreen
            title="Nicio persoană resursă înregistrată"
            button={
              <Button to={"/create/mentor"}>Adaugă persoană resursă</Button>
            }
          />
        )}
      </Section>
    </div>
  );
};

export default Mentors;
