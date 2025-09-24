import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Table from "@/components/Table";
import { useGetMe } from "@/services/user.queries";

const Profile = () => {
  const { data: user } = useGetMe();
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
            ["Program asociat", user.program?.name || ""],
            ["Disponibilitate", user.available ? "Disponibil" : "Indisponibil"],
          ].filter(Boolean)}
        />
      </Section>
    </>
  );
};

export default Profile;
