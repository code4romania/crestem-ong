import { Route } from "@/routes/(app)/activities/$activityId";
import { useSuspenseGetActivityById } from "@/services/activities.queries";

import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import formatDate from "@/lib/formatDate";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

function ActivityDetails() {
  const { activityId } = Route.useParams();
  const { data: activity } = useSuspenseGetActivityById(activityId);

  const rows: [string, string | undefined | null | ReactNode][] = [
    [
      "Persoană resursă",
      [activity.mentor.firstName, activity.mentor.lastName]
        .filter(Boolean)
        .join(" ") || "-",
    ],
    ["ONG participant", activity.user.ongName || "-"],
    ["Dimensiune", activity.dimension.name || "-"],
    ["Tip activitate", activity.type.name || "-"],
    ["Data", formatDate(activity.startDate) || "-"],
    ["Durata", `${activity.duration} ore`],
  ];

  return (
    <>
      <Section>
        <div className="flex w-full items-center justify-between">
          <Heading level="h2">Detalii activitate #{activity.id}</Heading>

          <Button asChild variant="secondary">
            <Link
              to="/mentors/$mentorId"
              params={{ mentorId: activity.mentor.id.toString() }}
            >
              Înapoi
            </Link>
          </Button>
        </div>

        <div className="mt-8 bg-white shadow ring-1 ring-gray-900/5 sm:rounded-lg">
          <dl className="divide-y divide-gray-100">
            {rows.map(([label, value], idx) => (
              <div
                key={idx}
                className={`px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {label}
                </dt>

                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {value || "-"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}

export default ActivityDetails;
