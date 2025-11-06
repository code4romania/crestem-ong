import { useGetUserMentorActivities } from "@/services/user.queries";

import EmptyScreen from "@/components/EmptyScreen";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Feed } from "@/components/Feed";
import ExportXLSX, { type Sheet } from "@/components/ExportXLSX";
import type { MentorActivityModel } from "@/services/api/types";
import formatDate from "@/lib/formatDate";

const getMentorActivitySheets = (
  activities: MentorActivityModel[]
): Sheet[] => {
  const rows = activities.map((activity) => ({
    Organizația: activity.user?.ongName,
    Dată: formatDate(activity.startDate),
    "Durată activitate (ore)": activity.duration,
    Dimensiune: activity.dimension.name,
    "Tip activitate": activity.type.name,
    Notițe: activity.notes,
  }));

  return [
    {
      name: "Jurnal de activitate",
      rows,
      cols: Object.keys(rows[0]).map((key) => ({ width: key.length + 10 })),
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
