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
import { type ReactNode } from "react";
import { MentorActivitiesTable } from "./components/table";
import { MentorStats } from "./components/mentor-stats";

const MentorDetails = ({ mentor }: { mentor: FinalDetailedUserModel }) => {
  const { userRole } = useAuth();

  if (mentor.role.type !== "mentor") {
    return <Navigate to="/" />;
  }

  const rows: [string | ReactNode, string | undefined | null | ReactNode][] = [
    [
      <Avatar className="size-72 rounded-none">
        <AvatarImage
          src={mentor.avatar?.formats?.medium?.url}
          alt={`${mentor.firstName} ${mentor.lastName}`}
        />
        <AvatarFallback>
          {[mentor.firstName?.[0], mentor.lastName?.[0]].join("") ?? "M"}
        </AvatarFallback>
      </Avatar>,
      <Heading level="h2">
        {mentor.firstName} {mentor.lastName}
      </Heading>,
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
            <Button asChild variant="secondary">
              <Link to="/mentors">Înapoi</Link>
            </Button>
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
                  {value || "-"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
      {userRole === "fdsc" && (
        <Section>
          <Heading level="h3">Jurnal de activitate</Heading>
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
