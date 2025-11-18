import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Separator } from "@/components/ui/separator";
import formatDate from "@/lib/formatDate";
import { Route } from "@/routes/(app)/programs/$programId";
import { useSuspenseGetProgram } from "@/services/programs.queries";
import ExportProgram from "./components/ExportProgram";
import MentorsTable from "./components/MentorsTable";
import NgosTable from "./components/NgosTable";

const Program = () => {
  const { programId } = Route.useParams();
  const { data: program } = useSuspenseGetProgram(programId);
  return (
    <>
      <Section>
        <div className="sm:flex sm:items-center w-full">
          <div className="sm:flex-auto">
            <Heading level={"h2"}>{program.name}</Heading>
          </div>

          <ExportProgram data={program} />
        </div>
      </Section>
      <Section>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Informații despre program
          </h2>

          <dl className="divide-y divide-gray-200">
            <div className="py-2 grid grid-cols-3 gap-4">
              <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                Denumire program
              </dt>
              <dd className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {program.name}
              </dd>
            </div>

            <div className="py-2 grid grid-cols-3 gap-4">
              <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                Data de început
              </dt>
              <dd className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {formatDate(program.startDate)}
              </dd>
            </div>

            <div className="py-2 grid grid-cols-3 gap-4">
              <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                Data de final
              </dt>
              <dd className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {formatDate(program.endDate)}
              </dd>
            </div>

            <div className="py-2 grid grid-cols-3 gap-4">
              <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                Nume finanțator
              </dt>
              <dd className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {program.sponsorName || "-"}
              </dd>
            </div>
          </dl>
        </div>
        <Separator />
      </Section>
      <Section>
        <NgosTable ngos={program?.users || []} program={program} />
      </Section>
      <Section>
        <MentorsTable mentors={program?.mentors || []} program={program} />
      </Section>
    </>
  );
};

export default Program;
