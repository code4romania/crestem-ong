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
    };
  });

const Home = () => {
  const { data: reports = [] } = useGetUserReports((data) => map(data));

  const stats = useMemo(() => {
    const stats: { label: string; value: string | number }[] = [
      { label: "Sesiuni de evaluare", value: reports.length },
      {
        label: "Completări evaluare",
        value: `${reports.reduce(
          (acc, curr) => acc + curr.numberOfCompletions,
          0
        )}/${reports.reduce((acc, curr) => acc + curr.totalEvaluations, 0)}`,
      },
    ];

    if (reports.some((r) => !r.isFinished)) {
      const totalEvaluationsInProgress = reports
        .filter((r) => !r.isFinished)
        .reduce(
          (acc, curr) => ({
            totalEvaluations: acc.totalEvaluations + curr.totalEvaluations,
            numberOfCompletions:
              acc.numberOfCompletions + curr.numberOfCompletions,
          }),
          { totalEvaluations: 0, numberOfCompletions: 0 }
        );

      stats.push({
        label: "Evaluari in progres",
        value: `${totalEvaluationsInProgress.numberOfCompletions}/${totalEvaluationsInProgress.totalEvaluations}`,
      });
    }
    return stats;
  }, [reports]);

  return (
    <>
      <Section className="py-4">
        <div className={"mb-10"}>
          <Heading level={"h2"}>Statisticile ong</Heading>
        </div>
        <Stats data={stats} />
      </Section>

      <Section className="py-4">
        <div className={"mb-10"}>
          <Heading level={"h2"}>Instrumentele disponibile</Heading>
        </div>
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz funcționare ONG</CardTitle>
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
              <CardTitle>Evaluare ONG</CardTitle>
              <CardDescription>
                Evaluă funcționalitatea unei ONG
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="link" asChild>
                <Link to="/reports">Vezi</Link>
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
