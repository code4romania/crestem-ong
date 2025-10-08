import Heading from "@/components/Heading";
import TableHeadReports from "@/components/index/TableHeadReports";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import TableRowReport from "@/components/TableRowReport";
import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScore } from "@/lib/score";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FinalDetailedUserModel } from "@/services/api/types";
import { Link, Navigate } from "@tanstack/react-router";

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
          <div className="flex gap-2">
            <Button asChild variant="secondary">
              <Link to="/users">Înapoi</Link>
            </Button>
          </div>
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
        <div className="flex w-full items-center justify-between">
          <Heading level="h2">Informații despre ONG</Heading>
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

      <Section>
        <div className="mb-4 text-lg font-semibold">Istoric evaluări</div>
        <table className="w-full">
          <TableHeadReports />
          <tbody className="divide-y divide-gray-200 bg-white">
            {ngo.reports?.map((report) => {
              return (
                <TableRowReport
                  key={report.id}
                  id={report.id}
                  createdAt={report.createdAt}
                  deadline={report.deadline}
                  evaluations={report.evaluations}
                  finished={report.finished}
                />
              );
            })}
          </tbody>
        </table>
      </Section>
    </>
  );
};

export default NgoDetails;
