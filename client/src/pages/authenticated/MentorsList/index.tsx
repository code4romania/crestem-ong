import React from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { useGetMentorsQuery } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import EmptyScreen from "@/components/EmptyScreen";
import MentorCard from "@/pages/authenticated/MentorsList/MentorCard";
import { useAppSelector } from "@/redux/store";

const Mentors = () => {
  const user = useAppSelector((state) => state.userState.user);
  const { data: mentors, isLoading } = useGetMentorsQuery();

  if (isLoading) {
    return <FullScreenLoader></FullScreenLoader>;
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
                userId={user.id}
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
