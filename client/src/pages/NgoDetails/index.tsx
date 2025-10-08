import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Stats from "@/components/Stats";

import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScore } from "@/lib/score";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FinalDetailedUserModel } from "@/services/api/types";
import { Link, Navigate } from "@tanstack/react-router";
import NgoReportsTable from "./components/table";

const NgoDetails = ({ ngo }: { ngo: FinalDetailedUserModel }) => {
  if (ngo.role.type !== "authenticated") {
    return <Navigate to="/" />;
  }

  const lastEvaluation = ngo.reports?.filter(
    (report) => report.evaluations.length
  );
  const lastReportCompletedEvaluations = evaluationsCompletedFilter(
    lastEvaluation?.[0]?.evaluations || []
  );
  const lastScore = calcScore(lastReportCompletedEvaluations);

  const rows = [
    ["Nume organizație", ngo.ongName],
    ["CIF-ul organizației", ngo.ongIdentificationNumber],
    ["Județ", ngo.city],
    ["Localitate", ngo.county],
    ["Email organizație", ngo.email],
    [
      "Domenii de activitate",
      ngo.domains?.length ? (
        <div className="flex flex-wrap gap-2">
          {ngo.domains.map((domain) => (
            <Badge key={domain.id} variant="secondary">
              {domain.name}
            </Badge>
          ))}
        </div>
      ) : (
        "-"
      ),
    ],
    ["Cuvinte cheie despre activitate", ngo.keywords],
    ["Descriere organizație", ngo.description],
    [
      "Website organizație",
      ngo.website ? (
        <Button asChild variant="link" className="p-0">
          <Link to={ngo.website} target="_blank" rel="noopener noreferrer">
            {ngo.website}
          </Link>
        </Button>
      ) : (
        "-"
      ),
    ],
    [
      "Link-uri social media",
      [
        ngo.accountFacebook,
        ngo.accountInstagram,
        ngo.accountLinkedin,
        ngo.accountTiktok,
        ngo.accountTwitter,
      ].filter(Boolean).length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {[
            ngo.accountFacebook,
            ngo.accountInstagram,
            ngo.accountLinkedin,
            ngo.accountTiktok,
            ngo.accountTwitter,
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
          src={ngo.avatar?.formats?.thumbnail?.url}
          alt={ngo.ongName}
        />
        <AvatarFallback>
          {ngo.ongName?.charAt(0).toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>,
    ],
    ["Nume reprezentant organizație", ngo.firstName],
    ["Prenume reprezentant organizație", ngo.lastName],
    ["Email reprezentant organizație", ngo.contactEmail],
    ["Telefon reprezentant organizație", ngo.contactPhone],
  ];
  return (
    <>
      <Section>
        <div className="flex w-full items-center justify-between">
          <Heading level={"h2"}>{ngo.ongName}</Heading>
          <Button asChild variant="secondary">
            <Link to="/users">Înapoi</Link>
          </Button>
        </div>
        <Stats
          data={[
            {
              label: "Scor total ultima evaluare",
              value: `${lastScore || 0}%`,
            },
            {
              label: "Total completări ultima evaluare",
              value: `${lastReportCompletedEvaluations.length}`,
            },
            {
              label: "Total evaluări realizate",
              value: ngo.reports?.length,
            },
          ]}
        />
      </Section>
      <Section>
        <Card>
          <CardContent>
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
          </CardContent>
        </Card>
      </Section>

      <Section>
        <Heading level="h3">Istoric evaluări</Heading>
        <Card>
          <CardContent>
            <NgoReportsTable ngo={ngo} reports={ngo.reports} />
          </CardContent>
        </Card>
      </Section>
    </>
  );
};

export default NgoDetails;
