import React from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { useFindProgramQuery } from "@/redux/api/userApi";
import { NavLink, useParams } from "react-router-dom";
import FullScreenLoader from "@/components/FullScreenLoader";
import Table from "@/components/Table";

const Program = () => {
  const { programId = "" } = useParams();

  const { isLoading, data } = useFindProgramQuery({ programId });

  if (!data || isLoading) return <FullScreenLoader />;

  return (
    <>
      <Section>
        <Heading level={"h2"}>{data.name}</Heading>
      </Section>
      <Section>
        <Table
          title="Informații despre program"
          body={[
            ["Denumire program", data.name],
            [
              "Perioadă de desfășurare: Data de început",
              new Date(data.startDate).toLocaleString("ro-RO", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            ],
            [
              "Perioadă de desfășurare: Data de final",
              new Date(data.endDate).toLocaleString("ro-RO", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            ],
            ["Nume finanțator", data.sponsorName || "-"],
          ]}
        />
      </Section>
      {data?.mentors?.length > 0 && (
        <Section>
          <Table
            title="Persoane resursă în program"
            head={[
              "Nume",
              "Specializare",
              "Disponibilitate",
              "Ultima activitate",
              "",
            ]}
            body={data.mentors.map((mentor) => [
              `${mentor.firstName} ${mentor.lastName}`,
              mentor.dimensions?.map((dimension) => dimension.name).join(", "),
              "Indisponibil",
              "-",
              <NavLink to={`/users/${mentor.id}`}>Vezi</NavLink>,
            ])}
          />
        </Section>
      )}
    </>
  );
};

export default Program;
