import React from "react";
import {
  EnvelopeIcon,
  SignalSlashIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useCreateMentorshipRequestMutation } from "@/redux/api/userApi";

const MentorCard = ({
  id,
  userId,
  firstName,
  lastName,
  dimensions,
  available,
}) => {
  const [createMentorshipRequest, { isSuccess }] =
    useCreateMentorshipRequestMutation();

  const handleClickEmail = () => {
    console.log("-->");
    // createMentorshipRequest({ mentor: +id, user: +userId });
  };

  return (
    <li className="flex flex-col justify-between overflow-hidden bg-white sm:rounded-lg sm:shadow text-center divide-y ">
      <div className="text-center">
        <UserIcon className="h-24 w-24 inline mr-2" />
        <h3 className="mt-6 text-xl font-semibold leading-8 tracking-tight text-gray-900">
          {firstName} {lastName}
        </h3>
        <p className="text-base leading-7 text-gray-500">
          {dimensions?.map((dimension) => dimension.name).join("; ")}
        </p>
      </div>
      <ul role="list" className="mt-6 flex gap-x-6 py-4 divide-x">
        <li className="w-full">
          <Link
            to={`/users/${id}`}
            className="text-teal-600 hover:text-teal-700"
          >
            <span className="sr-only">Twitter</span>
            <UserIcon className="h-5 w-5 inline mr-2" />
            <span className="inline">Vezi profil</span>
          </Link>
        </li>
        <li className="w-full">
          {available ? (
            <div
              className="text-gray-400 hover:text-gray-500 cursor-pointer"
              onClick={handleClickEmail}
            >
              <span className="sr-only">LinkedIn</span>
              <EnvelopeIcon className="h-5 w-5 inline mr-2" />
              <span>Trimite email</span>
            </div>
          ) : (
            <div className="select-none">
              <SignalSlashIcon className="h-5 w-5 inline mr-2 text-gray-400" />
              <span className="text-sm text-gray-700 italic">Indisponibil</span>
            </div>
          )}
        </li>
      </ul>
    </li>
  );
};

export default MentorCard;
