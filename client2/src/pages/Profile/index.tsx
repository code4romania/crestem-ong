import React from "react";
import { useGetMe, useGetUserDomains } from "@/services/user.queries";

import Section from "@/components/Section";
import Heading from "@/components/Heading";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const { data: user } = useGetMe();
  const { data: userDomains } = useGetUserDomains();

  if (!user) {
    return <></>;
  }

  return (
    <>
      <Section>
        <Heading level="h2">Profilul meu: {user.ongName}</Heading>
      </Section>

      <Section>
        <div>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Informații despre ONG
              </h1>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Button asChild>
                <Link to="/profile/edit">Editeaza</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 bg-white shadow ring-1 ring-gray-900/5 sm:rounded-lg">
            <dl className="divide-y divide-gray-100">
              {user.ongName && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Nume organizație
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user.ongName}
                  </dd>
                </div>
              )}

              {user.ongIdentificationNumber && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    CIF-ul organizației
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user.ongIdentificationNumber}
                  </dd>
                </div>
              )}

              {user.city && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Județ
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user.city}
                  </dd>
                </div>
              )}

              {user.county && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Localitate
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user.county}
                  </dd>
                </div>
              )}

              {user.email && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email organizație
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user.email}
                  </dd>
                </div>
              )}

              {userDomains && userDomains.length > 0 && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Domenii de activitate
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-2 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 ">
                    {userDomains.map((domain) => (
                      <Badge key={domain.id} variant="secondary">
                        {domain.name}
                      </Badge>
                    ))}
                  </dd>
                </div>
              )}

              {user.keywords && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Cuvinte cheie despre activitate
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user.keywords}
                  </dd>
                </div>
              )}

              {user.description && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Descriere organizație
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user.description}
                  </dd>
                </div>
              )}

              {user.website && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Website organizație
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    <Button asChild variant="link" className="p-0">
                      <Link
                        to={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.website}
                      </Link>
                    </Button>
                  </dd>
                </div>
              )}

              {(user.accountFacebook ||
                user.accountInstagram ||
                user.accountLinkedin ||
                user.accountTiktok ||
                user.accountTwitter) && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Link-uri social media
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 space-x-2 flex flex-wrap gap-2">
                    {[
                      user.accountFacebook,
                      user.accountInstagram,
                      user.accountLinkedin,
                      user.accountTiktok,
                      user.accountTwitter,
                    ]
                      .filter(Boolean)
                      .map((link, idx) => (
                        <Button variant="link" asChild className="p-0">
                          <Link
                            key={idx}
                            to={link!}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link}
                          </Link>
                        </Button>
                      ))}
                  </dd>
                </div>
              )}

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Logo organizație
                </dt>
                <dd className="mt-1 sm:col-span-2 sm:mt-0">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={user?.avatar?.formats?.thumbnail?.url}
                      alt={user?.ongName}
                    />
                    <AvatarFallback>
                      {user?.ongName?.charAt(0).toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                </dd>
              </div>

              {user.contactLastName && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Nume reprezentant organizație
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user.contactLastName}
                  </dd>
                </div>
              )}

              {user.contactFirstName && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Prenume reprezentant organizație
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user.contactFirstName}
                  </dd>
                </div>
              )}

              {user.contactEmail && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email reprezentant organizație
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user.contactEmail}
                  </dd>
                </div>
              )}

              {user.contactPhone && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Telefon reprezentant organizație
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user.contactPhone}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Profile;
