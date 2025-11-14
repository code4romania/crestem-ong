import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import type { FinalDetailedUserModel } from "@/services/api/types";
import { Link, Navigate } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { useCallback, type ReactNode } from "react";
import { MentorActivitiesTable } from "./components/table";
import { MentorStats } from "./components/mentor-stats";
import ExportXLSX from "@/components/ExportXLSX";
import { useListMentorMentorActivities } from "@/services/activities.queries";
import { mapper } from "./components/mapper";
import type { MentorActivityVM } from "./components/types";
import formatDate from "@/lib/formatDate";
import type { Sheet } from "@/lib/excel";

const MentorDetails = ({
  mentor,
  returnToProgramId,
}: {
  mentor: FinalDetailedUserModel;
  returnToProgramId?: string;
}) => {
  const { userRole } = useAuth();
  const { data: mentorActivities } = useListMentorMentorActivities(
    mentor.id,
    mapper
  );

  if (mentor.role.type !== "mentor" && mentor.role.type !== "fdsc") {
    return <Navigate to="/" />;
  }

  const getSheets = useCallback(
    (activities: MentorActivityVM[]): Sheet[] => {
      return [
        {
          name: "Jurnal de activitate",
          data: [
            [
              { value: "Organizația", bold: true },
              { value: "Mentor", bold: true },
              { value: "Dată", bold: true },
              { value: "Durată activitate (ore)", bold: true },
              { value: "Dimensiune", bold: true },
              { value: "Tip activitate", bold: true },
              { value: "Notițe", bold: true },
            ],
            ...activities.map((activity) => [
              activity.ngo,
              mentor.firstName + " " + mentor.lastName,
              formatDate(activity.startDate),
              activity.duration,
              activity.dimension,
              activity.activityType,
              activity.notes || "N/A",
            ]),
          ],
        },
      ];
    },
    [mentor, mentorActivities]
  );

  const rows: [string | ReactNode, string | undefined | null | ReactNode][] = [
    [
      <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4">
        {mentor.avatar?.formats?.medium?.url && (
          <Avatar className="size-72 rounded-none shrink-0">
            <AvatarImage
              src={mentor.avatar?.formats?.medium?.url}
              alt={`${mentor.firstName} ${mentor.lastName}`}
            />
          </Avatar>
        )}
        <Heading level="h2" className="text-center sm:text-left">
          {mentor.firstName} {mentor.lastName}
        </Heading>
      </div>,
      null,
    ],
    [
      "Descriere (bio)",
      <div className="minimal-tiptap-editor">
        <div className="ProseMirror">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(mentor.bio || "-"),
            }}
          ></div>
        </div>
      </div>,
    ],
    [
      "Arii de expertiză",
      <div className="minimal-tiptap-editor">
        <div className="ProseMirror">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(mentor.expertise || "-"),
            }}
          ></div>
        </div>
      </div>,
    ],
    [
      "Specializare pe dimensiuni",
      <div className="flex flex-wrap gap-2">
        {mentor.dimensions?.map(({ id, name }) => (
          <Badge key={id}>{name}</Badge>
        ))}
      </div>,
    ],
  ];

  return (
    <>
      <Section>
        <div className="flex w-full justify-end">
          <div className="flex gap-2">
            {returnToProgramId ? (
              <Button asChild variant="secondary">
                <Link
                  to="/programs/$programId"
                  params={{ programId: returnToProgramId.toString() }}
                >
                  Înapoi
                </Link>
              </Button>
            ) : (
              <Button asChild variant="secondary">
                <Link to="/mentors">Înapoi</Link>
              </Button>
            )}
            {userRole === "fdsc" && (
              <Button asChild>
                <Link
                  to="/mentors/$mentorId/edit"
                  params={{ mentorId: mentor.id.toString() }}
                >
                  Editeaza
                </Link>
              </Button>
            )}
          </div>
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
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
      {userRole === "fdsc" && (
        <Section>
          <div className="flex w-full items-center justify-between">
            <Heading level="h3">Jurnal de activitate</Heading>
            <ExportXLSX
              buttonVariant="secondary"
              className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"
              fileName={`jurnal-de-activitate.xlsx`}
              getSheets={() => getSheets(mentorActivities ?? [])}
            />
          </div>
          <div className="flex flex-col gap-4">
            <MentorStats mentor={mentor} />
            <MentorActivitiesTable mentor={mentor} />
          </div>
        </Section>
      )}
    </>
  );
};

export default MentorDetails;
