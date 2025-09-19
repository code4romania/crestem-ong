import Heading from "@/components/Heading";
import TableHeadReports from "@/components/index/TableHeadReports";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import TableRowReport from "@/components/TableRowReport";
import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScore } from "@/lib/score";
import { Route } from "@/routes/(app)/users/$userId";

const UserReports = () => {
  const { userId } = Route.useParams();
  const { data: user, isLoading } = useSuspenseGetUserReports(userId);

  const lastEvaluation = user?.reports?.filter(
    (report) => report.evaluations.length
  );
  const lastReportCompletedEvaluations = evaluationsCompletedFilter(
    lastEvaluation[0]?.evaluations || []
  );
  const lastScore = calcScore(lastReportCompletedEvaluations);

  return (
    <>
      <Section>
        <Heading level={"h2"}>{user?.ongName}</Heading>
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
              value: user?.reports.length,
            },
          ]}
        />
      </Section>
      <Section>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Informații despre ONG
            </h1>
            {/*<p className="mt-2 text-sm text-gray-700">*/}
            {/*  A list of all the users in your account including their name,*/}
            {/*  title, email and role.*/}
            {/*</p>*/}
          </div>
          {/*<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">*/}
          {/*  <Button>Editează</Button>*/}
          {/*</div>*/}
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <tbody className="bg-white">
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Nume organizație
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user?.ongName}
                    </td>
                  </tr>
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      CIF-ul organizației
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user?.ongIdentificationNumber}
                    </td>
                  </tr>
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Program
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      -
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Județ
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user?.county}
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Localitate
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user?.city}
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Email organizație
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user?.email}
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Telefon organizație
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user?.phone}
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Domenii de activitate
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user?.domains?.map((domain) => (
                        <span key={domain.id}>{domain.name}</span>
                      ))}
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Cuvinte cheie ale activității
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user?.keywords}
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Descriere organizatie
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {user?.description}
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Website organizatie
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {user?.website}
                    </td>
                  </tr>
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Link-uri social media
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {user?.accountFacebook && (
                        <a
                          className="text-sky-700 mr-2"
                          href={user?.accountFacebook}
                        >
                          Facebook
                        </a>
                      )}
                      {user?.accountInstagram && (
                        <a
                          className="text-sky-700 mr-2"
                          href={user?.accountInstagram}
                        >
                          Instagram
                        </a>
                      )}
                      {user?.accountInstagram && (
                        <a className="text-sky-700" href={user?.accountTwitter}>
                          Twitter
                        </a>
                      )}

                      {user?.accountInstagram && (
                        <a className="text-sky-700" href={user?.accountTiktok}>
                          TikTok
                        </a>
                      )}

                      {user?.accountInstagram && (
                        <a
                          className="text-sky-700"
                          href={user?.accountLinkedin}
                        >
                          Linkedin
                        </a>
                      )}
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Nume reprezentant organizatie
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user?.contactLastName}
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Prenume reprezentant organizatie
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user?.contactFirstName}
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Email reprezentant organizatie
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {user?.contactEmail}
                    </td>
                  </tr>{" "}
                  <tr className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      Telefon reprezentant organizatie
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {user?.contactPhone}
                    </td>
                  </tr>{" "}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="mb-4 text-lg font-semibold">Istoric evaluări</div>
        <table className="w-full">
          <TableHeadReports />
          <tbody className="divide-y divide-gray-200 bg-white">
            {user?.reports?.map((report) => {
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
