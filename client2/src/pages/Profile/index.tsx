import React from "react";
import { useAppSelector } from "@/redux/store";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Table from "@/components/Table";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";
import { Link } from "@tanstack/react-router";

const Profile = () => {
  const user = useAppSelector((state) => state.userState.user);
  if (!user) {
    return <></>;
  }

  // @ts-ignore
  return (
    <>
      <Section>
        <Heading level="h2">Profilul meu: {user.ongName}</Heading>
      </Section>
      <Section>
        <Table
          title="Informații despre ONG"
          button={<Button to="/profile/edit">Editeaza</Button>}
          body={[
            user.ongName && ["Nume organizație", user.ongName],
            user.ongIdentificationNumber && [
              "CIF-ul organizației",
              user.ongIdentificationNumber,
            ],
            user.city && ["Județ", user.city],
            user.county && ["Localitate", user.county],
            user.email && ["Email organizație", user.email],
            user.ongName && ["Telefon organizație", user.ongName],
            user.domains?.length && [
              "Domenii de activitate",
              user.domains?.map((domain) => domain.name)?.join(", "),
            ],
            user.keywords && ["Cuvinte cheie despre activitate", user.keywords],
            user.description && ["Descriere organizație", user.description],
            user.website && [
              "Website organizație",
              <Link to={user.website}>{user.website}</Link>,
            ],
            [
              "Link-uri social media",
              `${user.accountFacebook || ""} ${user.accountInstagram || ""} ${
                user.accountLinkedin || ""
              } ${user.accountTiktok || ""} ${user.accountTwitter || ""}`,
            ],
            user.avatar?.url && [
              "Logo organizație",
              <Avatar size={12} src={user.avatar?.url} alt={user.ongName} />,
            ],
            user.contactLastName && [
              "Nume reprezentant organizație",
              user.contactLastName,
            ],
            ["Prenume reprezentant organizație", user.contactFirstName],
            user.contactEmail && [
              "Email reprezentant organizație",
              user.contactEmail,
            ],
            user.contactPhone && [
              "Telefon reprezentant organizație",
              user.contactPhone,
            ],
          ].filter(Boolean)}
        />
      </Section>
    </>
  );
};

export default Profile;
