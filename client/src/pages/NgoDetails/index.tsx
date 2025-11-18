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
import MentorActivitiesTable from "./components/activities-table";
import { ExportActivitiesButton } from "./components/export-activities";
import NgoReportsTable from "./components/reports-table";

const NgoDetails = ({
  ngo,
  returnToProgramId,
}: {
  ngo: FinalDetailedUserModel;
  returnToProgramId?: string;
}) => {
  if (ngo.role.type !== "authenticated") {
    return <Navigate to="/" />;
  }

  const lastReports = ngo.reports
    ?.filter((report) => report.evaluations.length)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const lastReportCompletedEvaluations = evaluationsCompletedFilter(
    lastReports?.[0]?.evaluations || []
  );
  const lastScore = calcScore(lastReportCompletedEvaluations);

  return (
    <>
      <Section>
        <div className="flex w-full items-center justify-between">
          <Heading level={"h2"}>{ngo.ongName}</Heading>
          {returnToProgramId ? (
            <Button asChild variant="secondary">
              <Link
                to="/programs/$programId"
                params={{ programId: returnToProgramId.toString() }}
              >
                Înapoi
              </Link>
            </Button>
          ) : (
            <Button asChild variant="secondary">
              <Link to="/users">Înapoi</Link>
            </Button>
          )}
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
            <dl>
              <div className="px-4 py-4 sm:px-6  grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Nume organizație
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.ongName || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    CIF-ul organizației
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.ongIdentificationNumber || "-"}
                  </dd>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-6  grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Județ
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.county || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Localitate
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.city || "-"}
                  </dd>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-6  grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Nume reprezentant organizație
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.contactLastName || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Prenume reprezentant organizație
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.contactFirstName || "-"}
                  </dd>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-6  grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Email organizație
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.email || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Telefon organizație
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.phone || "-"}
                  </dd>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-6  grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Nume reprezentant organizație
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.contactLastName || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Prenume reprezentant organizație
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.contactFirstName || "-"}
                  </dd>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-6  grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Email reprezentant organizație
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.contactEmail || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Telefon reprezentant organizație
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.contactPhone || "-"}
                  </dd>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-6  grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50">
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Website organizație
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.website ? (
                      <Button asChild variant="link" className="p-0">
                        <Link
                          to={ngo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {ngo.website}
                        </Link>
                      </Button>
                    ) : (
                      "-"
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                    Cuvinte cheie despre activitate
                  </dt>
                  <dd className="text-sm leading-6 text-gray-700">
                    {ngo.keywords || "-"}
                  </dd>
                </div>
              </div>

              {/* Domenii de activitate */}
              <div className="px-4 py-4 sm:px-6 bg-white">
                <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                  Domenii de activitate
                </dt>
                <dd className="text-sm leading-6 text-gray-700">
                  {ngo.domains?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {ngo.domains.map((domain) => (
                        <Badge key={domain.id} variant="secondary">
                          {domain.name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    "-"
                  )}
                </dd>
              </div>

              {/* Descriere organizație */}
              <div className="px-4 py-4 sm:px-6 bg-gray-50">
                <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                  Descriere organizație
                </dt>
                <dd className="text-sm leading-6 text-gray-700">
                  {ngo.description || "-"}
                </dd>
              </div>

              {/* Link-uri social media */}
              <div className="px-4 py-4 sm:px-6 bg-white">
                <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                  Link-uri social media
                </dt>
                <dd className="text-sm leading-6 text-gray-700">
                  {[
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
                          <Button
                            key={idx}
                            variant="link"
                            asChild
                            className="p-0"
                          >
                            <Link
                              to={link!}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link}
                            </Link>
                          </Button>
                        ))}
                    </div>
                  ) : (
                    "-"
                  )}
                </dd>
              </div>

              {/* Logo organizație */}
              <div className="px-4 py-4 sm:px-6 bg-gray-50">
                <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                  Logo organizație
                </dt>
                <dd className="text-sm leading-6 text-gray-700">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={
                        ngo.avatar?.formats?.thumbnail?.url ||
                        "/placeholder.svg"
                      }
                      alt={ngo.ongName}
                    />
                    <AvatarFallback>
                      {ngo.ongName?.charAt(0).toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                </dd>
              </div>

              {/* Programe asociate */}
              <div className="px-4 py-4 sm:px-6 bg-white">
                <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                  Programe asociate
                </dt>
                <dd className="text-sm leading-6 text-gray-700">
                  {ngo.ngoPrograms?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {ngo.ngoPrograms?.map(({ id, name, endDate }) => (
                        <Badge
                          key={id}
                          variant={
                            new Date() > new Date(endDate)
                              ? "warning"
                              : "default"
                          }
                        >
                          {name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    "-"
                  )}
                </dd>
              </div>

              {/* Experți alocați */}
              <div className="px-4 py-4 sm:px-6 bg-gray-50">
                <dt className="text-sm font-medium leading-6 text-gray-900 mb-1">
                  Experți alocați
                </dt>
                <dd className="text-sm leading-6 text-gray-700">
                  {ngo.mentors
                    ?.map((mentor) => mentor.firstName + " " + mentor.lastName)
                    .join(", ") || "-"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </Section>

      <Section>
        <Heading level="h3">Istoric evaluări</Heading>
        <NgoReportsTable ngo={ngo} reports={ngo.reports} />
      </Section>

      <Section>
        <div className="flex w-full items-center justify-between">
          <Heading level="h3">Jurnal de activitate</Heading>
          <ExportActivitiesButton ngo={ngo} />
        </div>
        <MentorActivitiesTable ngo={ngo} />
      </Section>
    </>
  );
};

export default NgoDetails;
