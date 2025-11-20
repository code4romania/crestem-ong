import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import formatDate from "@/lib/formatDate";
import type { FinalReportModel } from "@/services/api/types";
import { useGetUserReports } from "@/services/reports.queries";
import { useSuspenseGetMe } from "@/services/user.queries";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
const map = (data: FinalReportModel[]) =>
  data.map((r) => {
    const evaluationsCompleted = r.evaluations
      ? r.evaluations.filter(({ dimensions }) => dimensions.length === 10)
      : [];

    return {
      numberOfCompletions: evaluationsCompleted.length,
      totalEvaluations: r.evaluations?.length || 0,
      isFinished: r.finished,
      reportId: r.id,
      createdAt: r.createdAt,
    };
  });

const getLatestFinishedReport = (
  data: FinalReportModel[]
): FinalReportModel | undefined => {
  const latest = data
    .filter((r) => r.finished)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )?.[0];

  return latest ?? undefined;
};
const Home = () => {
  const { data: reports = [] } = useGetUserReports((data) => map(data));
  const { data: latestFinishedReport } = useGetUserReports((data) =>
    getLatestFinishedReport(data)
  );
  const { data: me } = useSuspenseGetMe();

  console.log(me?.userSessions);

  const stats = useMemo(() => {
    const totalCompletions = reports.reduce(
      (acc, curr) => acc + curr.numberOfCompletions,
      0
    );

    const totalEvaluations = reports.reduce(
      (acc, curr) => acc + curr.totalEvaluations,
      0
    );

    const result: {
      evaluationSessions: number;
      evaluationCompletions: {
        completed: number;
        total: number;
      };
      evaluationsInProgress?: {
        reportId: number;
        completed: number;
        total: number;
      };
    } = {
      evaluationSessions: reports.length,
      evaluationCompletions: {
        completed: totalCompletions,
        total: totalEvaluations,
      },
    };

    // Add evaluationsInProgress only if needed
    if (reports.some((r) => !r.isFinished)) {
      const inProgressStats = reports
        .filter((r) => !r.isFinished)
        .reduce(
          (acc, curr) => ({
            completed: acc.completed + curr.numberOfCompletions,
            total: acc.total + curr.totalEvaluations,
          }),
          { completed: 0, total: 0 }
        );

      const inProgressReportId = reports
        .filter((r) => !r.isFinished)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )?.[0]?.reportId;

      result.evaluationsInProgress = {
        ...inProgressStats,
        reportId: inProgressReportId,
      };
    }

    return result;
  }, [reports]);

  return (
    <>
      <Section className="py-4">
        <div className={"mb-10"}>
          <Heading level={"h2"}>Statistici Organizație</Heading>
        </div>

        <div>
          <dl className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Total sesiuni de evaluare */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <dt className="font-medium text-gray-500">
                Total sesiuni de evaluare
              </dt>

              <dd className="mt-2 text-3xl font-bold text-gray-900">
                {stats.evaluationSessions ?? "-"}
              </dd>

              <Button variant="link" className="mt-3 p-0" asChild>
                <Link to="/reports">Vezi istoric evaluări</Link>
              </Button>
            </div>

            {/* Total matrici completate */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <dt className="font-medium text-gray-500">
                Total matrici completate
              </dt>

              <dd className="mt-2 text-3xl font-bold text-gray-900">
                {stats.evaluationCompletions.completed ?? "-"} /{" "}
                {stats.evaluationCompletions.total ?? "-"}
              </dd>

              <p className="text-xs text-gray-500 mt-1">
                (finalizate / inițiate)
              </p>

              <Button variant="link" className="mt-3 p-0" asChild>
                <Link to="/reports">Vezi istoric evaluări</Link>
              </Button>
            </div>

            {stats.evaluationsInProgress ? (
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <dt className="font-medium text-gray-500">
                  Matrici în curs de completare
                </dt>

                <dd className="mt-2 text-3xl font-bold text-gray-900">
                  {stats.evaluationsInProgress.completed ?? "-"} /{" "}
                  {stats.evaluationsInProgress.total ?? "-"}
                </dd>

                <p className="text-xs text-gray-500 mt-1">
                  (completări / invitații)
                </p>

                {stats.evaluationsInProgress.reportId && (
                  <Button variant="link" className="mt-3 p-0" asChild>
                    <Link
                      to={`/reports/$reportId`}
                      params={{
                        reportId:
                          stats.evaluationsInProgress.reportId.toString(),
                      }}
                    >
                      Vezi evaluare
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <dt className="font-medium text-gray-500">
                  Matrici în curs de completare
                </dt>

                <dd className="mt-2 text-3xl font-bold text-gray-900">-</dd>
              </div>
            )}
          </dl>
        </div>
      </Section>

      <Section className="py-4">
        <div className={"mb-10"}>
          <Heading level={"h2"}>Informații organizație</Heading>
        </div>

        <div>
          <dl className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <dt className="font-medium text-gray-500">Persoana Resursă</dt>

              <dd className="mt-2 flex flex-col gap-2">
                {me?.userSessions?.length
                  ? me?.userSessions
                      ?.map((session) => session.mentor)
                      .map((mentor) => ({
                        id: mentor.id,
                        name: mentor.firstName + " " + mentor.lastName,
                      }))
                      .map((mentor) => (
                        <Button
                          variant="link"
                          asChild
                          key={mentor.id}
                          className="text-3xl font-bold text-gray-900 text-left justify-start"
                        >
                          <Link
                            to={`/mentors/$mentorId`}
                            params={{ mentorId: mentor.id.toString() }}
                          >
                            {mentor.name}
                          </Link>
                        </Button>
                      ))
                  : "-"}
              </dd>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <dt className="font-medium text-gray-500">Program</dt>

              <dd className="mt-2 text-3xl font-bold text-gray-900 flex flex-col gap-2">
                {me?.ngoPrograms?.length
                  ? me?.ngoPrograms.map((program) => (
                      <span key={program.id}>{program.name}</span>
                    ))
                  : "-"}
              </dd>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <dt className="font-medium text-gray-500">
                Data finalizare evaluare
              </dt>

              <dd className="mt-2 text-3xl font-bold text-gray-900 flex flex-col gap-2">
                {latestFinishedReport?.createdAt ? (
                  <Button
                    asChild
                    variant="link"
                    className="text-3xl font-bold text-gray-900 text-wrap justify-start"
                  >
                    <Link
                      to={`/reports/$reportId`}
                      params={{
                        reportId: latestFinishedReport.id.toString(),
                      }}
                    >
                      <span className="text-wrap">
                        {formatDate(latestFinishedReport.createdAt)}
                      </span>
                    </Link>
                  </Button>
                ) : (
                  "-"
                )}
              </dd>
            </div>
          </dl>
        </div>
      </Section>
      <Section className="py-4">
        <div className={"mb-10"}>
          <Heading level={"h2"}>Instrumentele disponibile</Heading>
        </div>
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Biblioteca de resurse</CardTitle>
              <CardDescription>
                Accesează resursele disponibile pentru ONG
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="link" asChild>
                <a
                  href="https://crestem.ong/ro/biblioteca"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vezi
                </a>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Persoane resursa</CardTitle>
              <CardDescription>
                Accesează persoanele resursa pentru ONG
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="link" asChild>
                <Link to="/mentors">Vezi</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default Home;
