import FullScreenLoader from "@/components/FullScreenLoader";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Route } from "@/routes/(app)/users/$userId";
import { useSuspenseGetUserDetails } from "@/services/user.queries";
import type { ReactNode } from "react";

const UserReports = () => {
  const { userId } = Route.useParams();
  const { data: user, isLoading } = useSuspenseGetUserDetails(userId);
  if (isLoading) {
    return <FullScreenLoader />;
  }

  const rows: [string, string | undefined | null | ReactNode][] = [
    ["Nume persoană resursă", user.firstName],
    ["Prenume persoană resursă", user.lastName],
    ["Descriere (bio)", user.bio],
    ["Arii de expertiză", user.expertise],
    [
      "Specializare pe dimensiuni",
      <div className="flex flex-wrap gap-2">
        {user.dimensions
          ?.map(({ name }) => name)
          .map((dimension) => (
            <Badge>{dimension}</Badge>
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

export default UserReports;
