import React, { useMemo } from "react";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import screenshot from "@/assets/illustration.svg";
import { useAppSelector } from "@/redux/store";
import empty from "@/assets/empty.svg";
import TableHeadReports from "@/components/index/TableHeadReports";
import TableRowReport from "@/components/TableRowReport";
import UsersTable from "@/pages/Home/UsersTable";

const Home = () => {
  const user = useAppSelector((state) => state.userState.user);
  const hasReports = !!user?.reports?.length;
  const hasReportsInProgress = useMemo(
    () =>
      hasReports &&
      user.reports.filter((report) => !report.finished).length > 0,
    [hasReports, user?.reports]
  );

  const userType = user?.role?.type;

  if (userType === "fdsc") {
    return (
      <Section className="py-4">
        <div className={"mb-10"}>
          <Heading level={"h2"}>Users</Heading>
        </div>
        <UsersTable />
      </Section>
    );
  }

  return (
    <div>
      <Section>
        <div className={"space-y-2"}>
          <Heading level={"h2"}>Evaluare organizațională</Heading>
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
      {user ? (
        hasReports ? (
          <>
            <Section key={"reports"} className="overflow-x-hidden">
              <div className="overflow-x-scroll ">
                <table className="min-w-full divide-y divide-gray-300">
                  <TableHeadReports />
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {user.reports?.map((report) => {
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
              </div>
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
                      <Button to="/create/report">Începe evaluarea</Button>
                    </div>
                  </div>
                </div>
              </Section>
            )}
          </>
        ) : (
          <Section key="no-reports" className={"text-center"}>
            <img src={empty} className={"mx-auto mb-4"} />
            <Heading level={"h4"}> Nicio evaluare realizată</Heading>
            <p className={"mt-2 mb-4 max-w-xl mx-auto"}>
              Realizează evaluarea pentru a descoperi dimensiunile organizației
              care necesită dezvoltare{" "}
            </p>
            <Button to={"/create/report"}>Începe prima evaluare</Button>
          </Section>
        )
      ) : (
        <Section className="bg-gray-100 bg-opacity-70 text-center py-8">
          <Heading level="h2">Înscrie-te acum</Heading>
          <div className="mt-8">
            <Button color="white" to="/register">
              Înregistrează-te
            </Button>
          </div>
        </Section>
      )}
    </div>
  );
};

export default Home;
