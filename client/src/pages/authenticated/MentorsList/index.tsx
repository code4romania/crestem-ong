import EmptyScreen from "@/components/EmptyScreen";
import FullScreenLoader from "@/components/FullScreenLoader";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import MentorCard from "@/pages/authenticated/MentorsList/MentorCard";
import { useListMentors } from "@/services/mentors.queries";
import { useGetMe } from "@/services/user.queries";

const Mentors = () => {
  const { data: user, isLoading } = useGetMe();
  const { data: mentors, isLoading: isLoadingMentors } = useListMentors();

  if (isLoading || isLoadingMentors) {
    return <FullScreenLoader />;
  }

  return (
    <Section className="py-12">
      <div className="text-center mb-12">
        <Heading level="h2">Persoane resursă</Heading>
        <p className="mt-2 text-sm text-muted-foreground">
          Găsiți persoane resursă disponibile pentru colaborare.
        </p>
      </div>

      {mentors?.length ? (
        <div
          role="list"
          className="
            mx-auto
            grid
            gap-8
            sm:grid-cols-2
            lg:grid-cols-3
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {mentors.map((mentor) => (
            <MentorCard
              id={mentor.id.toString()}
              firstName={mentor.firstName}
              lastName={mentor.lastName}
              dimensions={mentor.dimensions}
              avatarUrl={mentor.avatar?.formats?.medium?.url}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-12">
          <EmptyScreen title="Nicio persoană resursă înregistrată" />
        </div>
      )}
    </Section>
  );
};

export default Mentors;
