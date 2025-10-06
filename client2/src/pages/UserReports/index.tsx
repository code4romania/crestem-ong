import Heading from "@/components/Heading";
import TableHeadReports from "@/components/index/TableHeadReports";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import TableRowReport from "@/components/TableRowReport";
import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScore } from "@/lib/score";
import { Route } from "@/routes/(app)/users/$userId";
import { useGetNgoDetails } from "@/services/ngos.queries";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import FullScreenLoader from "@/components/FullScreenLoader";

const UserReports = () => {
  const { userId } = Route.useParams();
  const { data: ngoDetails, isLoading } = useGetNgoDetails(userId);

  if (isLoading) return <FullScreenLoader />;

  const lastEvaluation = ngoDetails?.reports?.filter(
    (report) => report.evaluations.length
  );
  const lastReportCompletedEvaluations = evaluationsCompletedFilter(
    lastEvaluation?.[0]?.evaluations || []
  );
  const lastScore = calcScore(lastReportCompletedEvaluations);

  const rows = [
    ["Nume organizație", ngoDetails?.ongName],
    ["CIF-ul organizației", ngoDetails?.ongIdentificationNumber],
    ["Județ", ngoDetails?.city],
    ["Localitate", ngoDetails?.county],
    ["Email organizație", ngoDetails?.email],
    [
      "Domenii de activitate",
      ngoDetails?.domains?.length ? (
        <div className="flex flex-wrap gap-2">
          {ngoDetails?.domains.map((domain) => (
            <Badge key={domain.id} variant="secondary">
              {domain.name}
            </Badge>
          ))}
        </div>
      ) : (
        "-"
      ),
    ],
    ["Cuvinte cheie despre activitate", ngoDetails?.keywords],
    ["Descriere organizație", ngoDetails?.description],
    [
      "Website organizație",
      ngoDetails?.website ? (
        <Button asChild variant="link" className="p-0">
          <Link
            to={ngoDetails?.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ngoDetails?.website}
          </Link>
        </Button>
      ) : (
        "-"
      ),
    ],
    [
      "Link-uri social media",
      [
        ngoDetails?.accountFacebook,
        ngoDetails?.accountInstagram,
        ngoDetails?.accountLinkedin,
        ngoDetails?.accountTiktok,
        ngoDetails?.accountTwitter,
      ].filter(Boolean).length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {[
            ngoDetails?.accountFacebook,
            ngoDetails?.accountInstagram,
            ngoDetails?.accountLinkedin,
            ngoDetails?.accountTiktok,
            ngoDetails?.accountTwitter,
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
          src={ngoDetails?.avatar?.formats?.thumbnail?.url}
          alt={ngoDetails?.ongName}
        />
        <AvatarFallback>
          {ngoDetails?.ongName?.charAt(0).toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>,
    ],
    ["Nume reprezentant organizație", ngoDetails?.firstName],
    ["Prenume reprezentant organizație", ngoDetails?.lastName],
    ["Email reprezentant organizație", ngoDetails?.contactEmail],
    ["Telefon reprezentant organizație", ngoDetails?.contactPhone],
  ];
  return (
    <>
      <Section>
        <Heading level={"h2"}>{ngoDetails?.ongName}</Heading>
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
              value: ngoDetails?.reports?.length,
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
            {ngoDetails?.reports?.map((report) => {
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

export default UserReports;
