import React from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { useGetMentorsQuery } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import EmptyScreen from "@/components/EmptyScreen";
import {
  UserIcon,
  EnvelopeIcon,
  SignalSlashIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const Mentors = () => {
  const { data: mentors, isLoading } = useGetMentorsQuery();

  if (isLoading) {
    return <FullScreenLoader></FullScreenLoader>;
  }

  return (
    <div>
      <Section>
        <Heading level={"h2"}>Persoane resursă</Heading>
        {mentors.length > 0 ? (
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {mentors?.map((mentor) => (
              <li
                key={mentor.id}
                className="flex flex-col justify-between overflow-hidden bg-white sm:rounded-lg sm:shadow text-center divide-y "
              >
                <div className="text-center">
                  <UserIcon className="h-24 w-24 inline mr-2" />
                  <h3 className="mt-6 text-xl font-semibold leading-8 tracking-tight text-gray-900">
                    {mentor.firstName} {mentor.lastName}
                  </h3>
                  <p className="text-base leading-7 text-gray-500">
                    {mentor.dimensions
                      ?.map((dimension) => dimension.name)
                      .join("; ")}
                  </p>
                </div>
                <ul role="list" className="mt-6 flex gap-x-6 py-4 divide-x">
                  <li className="w-full">
                    <Link
                      to={`/users/${mentor.id}`}
                      className="text-teal-600 hover:text-teal-700"
                    >
                      <span className="sr-only">Twitter</span>
                      <UserIcon className="h-5 w-5 inline mr-2" />
                      <span className="inline">Vezi profil</span>
                    </Link>
                  </li>
                  <li className="w-full">
                    {mentor.available ? (
                      <Link
                        color="white"
                        to={`mailto:${mentor.email}`}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <EnvelopeIcon className="h-5 w-5 inline mr-2" />
                        <span>Trimite email</span>
                      </Link>
                    ) : (
                      <div className="select-none">
                        <SignalSlashIcon className="h-5 w-5 inline mr-2 text-gray-400" />
                        <span className="text-sm text-gray-700 italic">
                          Indisponibil
                        </span>
                      </div>
                    )}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyScreen title="Nicio persoană resursă înregistrată" />
        )}
      </Section>
    </div>
  );
};

export default Mentors;
