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
          title="Informații despre ONG"
          description="Use a permanent address where you can receive mail."
          button={<Button to="/profile/edit">Editeaza</Button>}
          body={[
            ["Nume organizație", user.ongName],
            ["CIF-ul organizației", user.ongIdentificationNumber],
            ["Județ", user.city],
            ["Localitate", user.county],
            ["Email organizație", user.email],
            ["Telefon organizație", user.ongName],
            [
              "Domenii de activitate",
              user.domains?.map((domain) => domain.name)?.join(", "),
            ],
            ["Cuvinte cheie despre activitate", user.ongName],
            ["Descriere organizație", user.ongName],
            ["Website organizație", user.website],
            [
              "Link-uri social media",
              `${user.accountFacebook || ""} ${user.accountInstagram || ""} ${
                user.accountLinkedin || ""
              } ${user.accountTiktok || ""} ${user.accountTwitter || ""}`,
            ],
            ["Logo organizație", user.avatar],
            ["Nume reprezentant organizație", user.contactFirstName],
            ["Prenume reprezentant organizație", user.contactFirstName],
            ["Email reprezentant organizație", user.contactEmail],
            ["Telefon reprezentant organizație", user.contactPhone],
          ]}
        />
      </Section>
    </>
  );
};

export default Profile;
