import React from "react";
import { useGetMe } from "@/services/user.queries";

import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Feed from "@/components/Feed";
import EmptyScreen from "@/components/EmptyScreen";
import Button from "@/components/Button";

const Activities = () => {
  const { data: user } = useGetMe();
  const { mentorActivities } = user;

  return (
    <div>
      <Section>
        <Heading level={"h2"}>Jurnal de activitate</Heading>
      </Section>
      <Section>
        <div className="flex justify-between">
          <div className="text-lg font-semibold">Jurnal de activitate</div>
          <div>
            <Button to="/create/activity">Adaugă activitate</Button>
          </div>
        </div>
      </Section>
      <Section>
        {mentorActivities ? (
          <Feed activity={mentorActivities} />
        ) : (
          <EmptyScreen
            title="Nu aveti nicio activitate creata"
            button={
              <Button to={"/create/activity"}>Începe prima activitate</Button>
            }
          />
        )}
      </Section>
    </div>
  );
};

export default Activities;
