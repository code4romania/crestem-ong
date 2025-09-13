import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Confirm from "@/components/Confirm";
import type { Dimension } from "@/redux/api/types";
import { useCreateMentorshipRequestMutation } from "@/redux/api/userApi";
import { selectHasFinishedReports } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/store";
import {
  EnvelopeIcon,
  SignalSlashIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
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
  userId: string;
  firstName: string;
  lastName: string;
  dimensions: Dimension[];
  available: boolean;
  avatarUrl?: string;
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [createMentorshipRequest, { isSuccess, isError }] =
    useCreateMentorshipRequestMutation();
  const hasFinishedReports = useAppSelector(selectHasFinishedReports);
  const handleClickEmail = () => {
    setOpenConfirm(true);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Trimis cu succes");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Această acțiune nu a putut fi realizată");
    }
  }, [isError]);

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
              className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:col-start-2"
              onClick={() => {
                createMentorshipRequest({ mentor: +id, user: +userId });
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
        <Avatar
          src={avatarUrl || ""}
          alt={`${firstName} ${lastName}`}
          width={100}
          height={100}
        />

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
        <Button to={`/users/${id}`}>
          <span className="sr-only">Twitter</span>
          <UserIcon className="h-5 w-5 inline mr-2" />
          <span className="inline">Vezi profil</span>
        </Button>
        {available ? (
          <Button
            color="white"
            disabled={!hasFinishedReports}
            onClick={handleClickEmail}
          >
            <span className="sr-only">LinkedIn</span>
            <EnvelopeIcon className="h-5 w-5 inline mr-2" />
            <span>Trimite email</span>
          </Button>
        ) : (
          <Button color="white" disabled>
            <SignalSlashIcon className="h-5 w-5 inline mr-2 text-gray-400" />
            <span className="text-sm text-gray-700 italic">Indisponibil</span>
          </Button>
        )}
      </ul>
    </li>
  );
};

export default MentorCard;
