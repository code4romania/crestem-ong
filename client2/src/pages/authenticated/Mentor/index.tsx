import React from "react";
import { useParams } from "@tanstack/react-router";
import { useGetUserReportsQuery } from "@/redux/api/userApi";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import FullScreenLoader from "@/components/FullScreenLoader";

const UserReports = () => {
  const { userId } = useParams();
  const { data: user, isLoading } = useGetUserReportsQuery({ userId });
  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <Section>
        <Heading level={"h2"}>
          {user?.firstName} {user?.lastName}
        </Heading>
        <div className={"mt-4"}>{user.bio}</div>
        <div>
          {user.dimensions?.map((dimension) => dimension.name).join("; ")}
        </div>
      </Section>
    </>
  );
};

export default UserReports;
