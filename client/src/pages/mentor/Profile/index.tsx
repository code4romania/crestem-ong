import React from "react";
import { useAppSelector } from "@/redux/store";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Table from "@/components/Table";
import Button from "@/components/Button";

const Profile = () => {
  const user = useAppSelector((state) => state.userState.user);
  if (!user) {
    return <></>;
  }

  return (
    <>
      <Section>
        <Heading level="h2">Profilul meu: {user.ongName}</Heading>
      </Section>
      <Section>
        <Table
          title="Informații generale"
          button={<Button to="/profile/edit">Editeaza</Button>}
          body={[
            ["Nume persoană resursă", user.firstName],
            ["Prenume persoană resursă", user.lastName],
            ["Email persoană resursă", user.email],
            ["Descriere (bio)", user.bio],
            ["Arii de expertiză", user.expertise],
            [
              "Specializare pe dimensiuni",
              user.dimensions?.map(({ name }) => name).join(", "),
            ],
            ["Program asociat", user.program.name],
            ["Disponibilitate", user.available ? "Disponibil" : "Indisponibil"],
          ]}
        />
      </Section>
    </>
  );
};

export default Profile;
