import { useGetUserMentorActivities } from "@/services/user.queries";

import EmptyScreen from "@/components/EmptyScreen";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Feed } from "@/components/Feed";

const Activities = () => {
  const { data: mentorActivities } = useGetUserMentorActivities((activities) =>
    activities.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
  );

  return (
    <div>
      <Section>
        <Heading level={"h2"}>Jurnal de activitate</Heading>
      </Section>
      <Section>
        <div className="flex justify-between">
          <div className="text-lg font-semibold">Jurnal de activitate</div>
          <div>
            <Button asChild>
              <Link to="/create/activity">Adaugă activitate</Link>
            </Button>
          </div>
        </div>
      </Section>
      <Section>
        {mentorActivities ? (
          <Feed activities={mentorActivities} />
        ) : (
          <EmptyScreen
            title="Nu aveti nicio activitate creata"
            button={
              <Button asChild>
                <Link to="/create/activity">Începe prima activitate</Link>
              </Button>
            }
          />
        )}
      </Section>
    </div>
  );
};

export default Activities;
