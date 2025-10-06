import Confirm from "@/components/Confirm";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Route } from "@/routes/(app)/users/$userId";
import { useCreateMentorshipRequestMutation } from "@/services/mentors.mutations";
import { useGetUserReports } from "@/services/reports.queries";
import { useSuspenseGetUserDetails } from "@/services/user.queries";
import { EnvelopeIcon, SignalSlashIcon } from "@heroicons/react/20/solid";
import { Navigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

const UserReports = () => {
  const { userId } = Route.useParams();
  const { data: user } = useSuspenseGetUserDetails(userId);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { mutate: createMentorshipRequest } =
    useCreateMentorshipRequestMutation();

  const handleClickEmail = () => {
    setOpenConfirm(true);
  };

  const hasFinishedReports = useGetUserReports(
    (reports) => reports?.some((r) => r.finished) ?? false
  );

  if (!user) {
    return <Navigate to="/" />;
  }

  const rows: [string, string | undefined | null | ReactNode][] = [
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
            Profilul: {user.firstName} {user.lastName}
          </Heading>

          <Confirm
            open={openConfirm}
            setOpen={setOpenConfirm}
            handleComplete={handleClickEmail}
            header="Contactează persoana resursă"
            body="Trimiteți persoanei resursă un email prin care o informați că doriți să colaborați. Emailul va conține rezultatele ultimei evaluări și adresa de email a organizației, pentru a vă putea contacta."
            buttonText="Confirm"
            footer={
              <>
                <Button
                  type="button"
                  onClick={() => {
                    createMentorshipRequest(
                      { mentor: +user.id, user: +userId },
                      {
                        onSuccess: () => toast.success("Trimis cu succes"),
                        onError: () =>
                          toast.error(
                            "Această acțiune nu a putut fi realizată"
                          ),
                      }
                    );
                    setOpenConfirm(false);
                  }}
                >
                  Confirm
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setOpenConfirm(false)}
                >
                  Renunță
                </Button>
              </>
            }
          />

          {user.available ? (
            <Button
              variant="secondary"
              disabled={!hasFinishedReports}
              onClick={handleClickEmail}
            >
              <span className="sr-only">LinkedIn</span>
              <EnvelopeIcon className="h-5 w-5 inline mr-2" />
              <span>Trimite email</span>
            </Button>
          ) : (
            <Button variant="secondary" disabled>
              <SignalSlashIcon className="h-5 w-5 inline mr-2 text-gray-400" />
              <span className="text-sm text-gray-700 italic">Indisponibil</span>
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

export default UserReports;
