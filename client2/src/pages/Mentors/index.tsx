import Button from "@/components/Button";
import EmptyScreen from "@/components/EmptyScreen";
import FullScreenLoader from "@/components/FullScreenLoader";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Table from "@/components/Table";
import { Badge } from "@/components/ui/badge";
import { Route } from "@/routes/(app)/mentors";
import { useListMentors } from "@/services/mentors.queries";

const Mentors = () => {
  const params = Route.useSearch();
  const { data: mentors, isLoading } = useListMentors(params);

  if (isLoading) {
    return <FullScreenLoader></FullScreenLoader>;
  }

  return (
    <div>
      <Section>
        <Heading level={"h2"}>Persoane resursă</Heading>
        {mentors?.length ? (
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
              <div className="flex flex-wrap gap-1 p-1">
                {mentor?.dimensions.map((program) => (
                  <Badge>{program.name}</Badge>
                ))}
              </div>,
              `${mentor.available ? "Disponibil" : "Indisponibil"}`,
              <div className="flex flex-wrap gap-1 p-1">
                {mentor?.programs.map((program) => (
                  <Badge>{program.name}</Badge>
                ))}
              </div>,

              mentor?.mentorActivities?.at(-1)
                ? new Date(
                    mentor?.mentorActivities?.at(-1)?.createdAt!
                  ).toLocaleString("ro-RO", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "-",
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
