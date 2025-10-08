import FullScreenLoader from "@/components/FullScreenLoader";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useGetMe,
  useGetUserDimensions,
  useGetUserPrograms,
} from "@/services/user.queries";
import { Link, redirect } from "@tanstack/react-router";
import type { ReactNode } from "react";
import DOMPurify from "dompurify";

const Profile = () => {
  const { data: user, isPending } = useGetMe();
  const { data: dimensions } = useGetUserDimensions();
  const { data: programs } = useGetUserPrograms();

  if (isPending) return <FullScreenLoader />;
  if (!user) {
    throw redirect({ to: "/" });
  }

  const rows: [string, string | undefined | null | ReactNode][] = [
    ["Nume persoană resursă", user.firstName],
    ["Prenume persoană resursă", user.lastName],
    ["Email persoană resursă", user.email],
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
        {dimensions
          ?.map(({ name }) => name)
          .map((dimension) => (
            <Badge>{dimension}</Badge>
          ))}
      </div>,
    ],
    [
      "Programe asociate",
      <div className="flex flex-wrap gap-2">
        {programs
          ?.map(({ name }) => name)
          .map((program) => (
            <Badge>{program}</Badge>
          ))}
      </div>,
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
          <Heading level="h2">Profilul meu: {user.ongName}</Heading>

          <Button asChild>
            <Link to="/profile/edit">Editeaza</Link>
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
};

export default Profile;
