import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FinalReportModel } from "@/services/api/types";
import { useGetUserReports } from "@/services/reports.queries";
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

const Home = () => {
  const { data: reports = [] } = useGetUserReports((data) => map(data));

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
                <Link to="/reports">Vezi</Link>
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
                <Link to="/reports">Vezi</Link>
              </Button>
            </div>

            {/* Matrici în curs de completare — rendered only when exists */}
            {stats.evaluationsInProgress && (
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
                      Vezi
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </dl>
        </div>
      </Section>

      <Section className="py-4">
        <div className={"mb-10"}>
          <Heading level={"h2"}>Instrumentele disponibile</Heading>
        </div>
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Quiz ONG</CardTitle>
              <CardDescription>
                Testează cunoștințele tale despre funcționarea unei ONG
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="link" asChild>
                <Link to="/matrix">Vezi</Link>
              </Button>
            </CardFooter>
          </Card>

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
