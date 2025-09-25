import Confirm from "@/components/Confirm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { MentorDimensionModel } from "@/services/api/types";
import { useCreateMentorshipRequestMutation } from "@/services/mentors.mutations";
import { useGetUserReports } from "@/services/reports.queries";
import {
  EnvelopeIcon,
  SignalSlashIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

const MentorCard = ({
  id,
  userId,
  firstName,
  lastName,
  dimensions,
  available,
  avatarUrl,
}: {
  id: string;
  userId: number;
  firstName: string;
  lastName: string;
  dimensions: MentorDimensionModel[];
  available: boolean;
  avatarUrl?: string;
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const { mutate: createMentorshipRequest } =
    useCreateMentorshipRequestMutation();

  const hasFinishedReports = useGetUserReports(
    (reports) => reports?.some((r) => r.finished) ?? false
  );
  const handleClickEmail = () => {
    setOpenConfirm(true);
  };

  return (
    <li className="flex flex-col justify-between overflow-hidden bg-white sm:rounded-lg sm:shadow text-center divide-y ">
      <Confirm
        open={openConfirm}
        setOpen={setOpenConfirm}
        handleComplete={handleClickEmail}
        header="Contactează persoana resursă"
        body="Trimiteți persoanei resursă un email prin care o informați că doriți să colaborați. Emailul va conține rezultatele ultimei evaluări și adresa de email a organizației, pentru a vă putea contacta."
        buttonText="Confirm"
        footer={
          <>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:col-start-2"
              onClick={() => {
                createMentorshipRequest(
                  { mentor: +id, user: +userId },
                  {
                    onSuccess: () => toast.success("Trimis cu succes"),
                    onError: () =>
                      toast.error("Această acțiune nu a putut fi realizată"),
                  }
                );
                setOpenConfirm(false);
              }}
            >
              Confirm
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              onClick={() => setOpenConfirm(false)}
            >
              Renunță
            </button>
          </>
        }
      />
      <div className="flex flex-col items-center py-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl} alt={`${firstName} ${lastName}`} />
          <AvatarFallback>
            {[firstName[0], lastName[0]].join("") ?? "?"}
          </AvatarFallback>
        </Avatar>

        <h3 className="mt-6 text-xl font-semibold leading-8 tracking-tight text-gray-900">
          {firstName} {lastName}
        </h3>
        <p className="text-base leading-7 text-gray-500">
          {dimensions?.map((dimension) => dimension?.name).join("; ")}
        </p>
      </div>
      <ul
        role="list"
        className="mt-6 flex justify-center items-center gap-x-2 py-4"
      >
        <Button asChild>
          <Link to={`/users/$userId`} params={{ userId: id }}>
            <span className="sr-only">Twitter</span>
            <UserIcon className="h-5 w-5 inline mr-2" />
            <span className="inline">Vezi profil</span>
          </Link>
        </Button>
        {available ? (
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
      </ul>
    </li>
  );
};

export default MentorCard;
