import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { Route } from "@/routes/(app)/users/$userId";
import { useSuspenseGetUserDetails } from "@/services/user.queries";
import { Link, Navigate } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { type ReactNode } from "react";

const MentorDetails = () => {
  const { userId } = Route.useParams();
  const { data: user } = useSuspenseGetUserDetails(userId);
  const { userRole } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  const rows: [string, string | undefined | null | ReactNode][] = [
    [
      "Descriere (bio)",
      <div className="minimal-tiptap-editor">
        <div className="ProseMirror">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(user.bio || "-"),
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
              __html: DOMPurify.sanitize(user.expertise || "-"),
            }}
          ></div>
        </div>
      </div>,
    ],
    [
      "Specializare pe dimensiuni",
      <div className="flex flex-wrap gap-2">
        {user.dimensions?.map(({ id, name }) => (
          <Badge key={id}>{name}</Badge>
        ))}
      </div>,
    ],
    [
      "Poză profil",
      <Avatar className="h-16 w-16">
        <AvatarImage
          src={user.avatar?.formats?.medium?.url}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <AvatarFallback>
          {[user.firstName?.[0], user.lastName?.[0]].join("") ?? "-"}
        </AvatarFallback>
      </Avatar>,
    ],
    [
      "Disponibilitate",
      user.available ? (
        <Badge>Disponibil</Badge>
      ) : (
        <Badge variant="destructive">Indisponibil</Badge>
      ),
    ],
  ];

  return (
    <>
      <Section>
        <div className="flex w-full items-center justify-between">
          <Heading level="h2">
            {user.firstName} {user.lastName}
          </Heading>
          {userRole === "fdsc" && (
            <Button asChild>
              <Link to="/users/$userId/edit" params={{ userId }}>
                Editeaza
              </Link>
            </Button>
          )}
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
};

export default MentorDetails;
