import screenshot from "@/assets/illustration.svg";
import EmptyScreen from "@/components/EmptyScreen";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { useGetUserReports } from "@/services/reports.queries";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ReportsTable } from "./components/table";

const Home = () => {
  const { data: reports } = useGetUserReports();

  const hasReports = !!reports?.length;
  const hasReportsInProgress = useMemo(
    () => hasReports && reports.some((report) => !report.finished),
    [hasReports, reports]
  );

  return (
    <div>
      <Section>
        <div className={"flex justify-between space-y-2"}>
          <Heading level={"h2"}>Evaluare organizațională</Heading>
          <Button asChild>
            <Link to="/matrix" target="_blank" rel="noopener noreferrer">
              Vezi matricea
            </Link>
          </Button>
        </div>
      </Section>
      {!hasReports && (
        <Section className="py-6">
          <div className="grid lg:grid-cols-2 justify-center mt-0 mr-auto mb-0 ml-auto container gap-8">
            <div className="w-full h-full flex items-center justify-center pt-0 pr-4 pb-0 pl-4 md:mb-0">
              <img src={screenshot} />
            </div>
            <div className="w-full h-full items- justify- pt-0 pr-4 pb-0 pl-4 md:mb-0 text-lg text-gray-500">
              <p>
                Matricea de dezvoltare organizațională sprijină organizațiile în
                procesul de management, în gestionarea provocărilor legate de
                îndeplinirea misiunii, sustenabilitate și creșterea impactului
                social. Chestionarul te ajută să identifici nevoi, punctele tari
                și cele de îmbunătățit ale organizației tale din 10 perspective:
                Guvernanță, Aspecte financiare, Managementul informației,
                Monitorizare și evaluare, Structură organizațională, Leadership,
                Managementul resurselor umane, Implicarea persoanelor
                beneficiare, Advocacy și parteneriate, Comunicare externă.
              </p>
            </div>
          </div>
        </Section>
      )}
      {hasReports ? (
        <>
          <Section>
            <ReportsTable />
          </Section>
          {!hasReportsInProgress && (
            <Section>
              <div className="bg-teal-600/10 px-16 py-20 flex flex-col md:flex-row space-y-5 items-center">
                <div className="w-auto">
                  <Heading level={"h2"}>
                    Pregătit să reevaluezi organizația ?
                  </Heading>
                  <div className="text-teal-800">
                    <Heading level={"h2"}>
                      Începe o evaluare nouă pentru a vedea progresul!
                    </Heading>
                  </div>
                </div>
                <div className={"md:w-1/2 lg:w-1/3"}>
                  <div className="float-right">
                    <Button asChild>
                      <Link to="/create/report">Începe evaluarea</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Section>
          )}
        </>
      ) : (
        <Section key="no-reports" className="pb-8">
          <EmptyScreen
            title="Nicio evaluare realizată"
            button={
              <Button asChild>
                <Link to={"/create/report"}>Începe prima evaluare</Link>
              </Button>
            }
          />
        </Section>
      )}
    </div>
  );
};

export default Home;
