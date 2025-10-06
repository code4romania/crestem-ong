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
    <div>
      <Section>
        <Heading level={"h2"}>Persoane resursă</Heading>
        {mentors?.length ? (
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {mentors?.map((mentor) => (
              <MentorCard
                key={mentor.id}
                id={mentor.id.toString()}
                userId={user!.id}
                available={mentor.available}
                firstName={mentor.firstName}
                lastName={mentor.lastName}
                dimensions={mentor.dimensions}
                avatarUrl={mentor.avatar?.url}
              />
            ))}
          </ul>
        ) : (
          <div className="py-6">
            <EmptyScreen title="Nicio persoană resursă înregistrată" />
          </div>
        )}
      </Section>
    </div>
  );
};

export default Mentors;
