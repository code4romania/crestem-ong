import { useGetUserMentorActivities } from "@/services/user.queries";

import EmptyScreen from "@/components/EmptyScreen";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Feed } from "@/components/Feed";
import type { MentorActivityModel } from "@/services/api/types";
import formatDate from "@/lib/formatDate";
import ExportXLSX from "@/components/ExportXLSX";
import type { Sheet } from "@/lib/excel";

const getMentorActivitySheets = (
  activities: MentorActivityModel[]
): Sheet[] => {
  return [
    {
      name: "Jurnal de activitate",
      data: [
        [
          { value: "Organizația", bold: true },
          { value: "Dată", bold: true },
          { value: "Durată activitate (ore)", bold: true },
          { value: "Dimensiune", bold: true },
          { value: "Tip activitate", bold: true },
          { value: "Notițe", bold: true },
        ],
        ...activities.map((activity) => [
          activity.user?.ongName,
          formatDate(activity.startDate),
          activity.duration,
          activity.dimension.name,
          activity.type.name,
          activity.notes || "N/A",
        ]),
      ],
    },
  ];
};
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
          <div className="flex gap-2">
            <ExportXLSX
              buttonVariant="secondary"
              className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"
              fileName={`jurnal-de-activitate.xlsx`}
              getSheets={() => getMentorActivitySheets(mentorActivities ?? [])}
            />
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
