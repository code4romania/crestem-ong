import FullScreenLoader from "@/components/FullScreenLoader";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { useGetUserReports } from "@/services/reports.queries";
import { useParams } from "@tanstack/react-router";

const UserReports = () => {
  const { userId } = useParams();
  const { data: user, isLoading } = useGetUserReports({ userId });
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
