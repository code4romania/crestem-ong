import React from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import EmptyScreen from "@/components/EmptyScreen";
import Button from "@/components/Button";
import { useAppSelector } from "@/redux/store";

const Activities = () => {
  const user = useAppSelector((state) => state.userState.user);
  console.log("user", user);
  return (
    <div>
      <Section>
        <Heading level={"h2"}>Jurnal de activitate</Heading>
      </Section>
      <Section>
        <EmptyScreen
          title="Nu aveti nicio activitate creata"
          button={
            <Button to={"/create/activity"}>Începe prima activitate</Button>
          }
        />
      </Section>
    </div>
  );
};

export default Activities;
