import { useGetUserDomains } from "@/services/user.queries";

import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { Link } from "@tanstack/react-router";

const Profile = () => {
  const { user } = useAuth();
  const { data: userDomains } = useGetUserDomains();

  if (!user) {
    return <></>;
  }

  const rows = [
    ["Nume organizație", user.ongName],
    ["CIF-ul organizației", user.ongIdentificationNumber],
    ["Județ", user.city],
    ["Localitate", user.county],
    ["Email organizație", user.email],
    [
      "Domenii de activitate",
      userDomains && userDomains.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {userDomains.map((domain) => (
            <Badge key={domain.id} variant="secondary">
              {domain.name}
            </Badge>
          ))}
        </div>
      ) : (
        "-"
      ),
    ],
    ["Cuvinte cheie despre activitate", user.keywords],
    ["Descriere organizație", user.description],
    [
      "Website organizație",
      user.website ? (
        <Button asChild variant="link" className="p-0">
          <Link to={user.website} target="_blank" rel="noopener noreferrer">
            {user.website}
          </Link>
        </Button>
      ) : (
        "-"
      ),
    ],
    [
      "Link-uri social media",
      [
        user.accountFacebook,
        user.accountInstagram,
        user.accountLinkedin,
        user.accountTiktok,
        user.accountTwitter,
      ].filter(Boolean).length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {[
            user.accountFacebook,
            user.accountInstagram,
            user.accountLinkedin,
            user.accountTiktok,
            user.accountTwitter,
          ]
            .filter(Boolean)
            .map((link, idx) => (
              <Button key={idx} variant="link" asChild className="p-0">
                <Link to={link!} target="_blank" rel="noopener noreferrer">
                  {link}
                </Link>
              </Button>
            ))}
        </div>
      ) : (
        "-"
      ),
    ],
    [
      "Logo organizație",
      <Avatar className="h-16 w-16">
        <AvatarImage
          src={user?.avatar?.formats?.thumbnail?.url}
          alt={user?.ongName}
        />
        <AvatarFallback>
          {user?.ongName?.charAt(0).toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>,
    ],
    ["Nume reprezentant organizație", user.contactFirstName],
    ["Prenume reprezentant organizație", user.contactLastName],
    ["Email reprezentant organizație", user.contactEmail],
    ["Telefon reprezentant organizație", user.contactPhone],
    ["Program", user.program?.name],
    [
      "Experți alocați",
      user.mentors
        ?.map((mentor) => mentor.firstName + " " + mentor.lastName)
        .join(", "),
    ],
  ];

  return (
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
  );
};

export default Profile;
