import ExportXLSX, { type Sheet } from "@/components/ExportXLSX";
import FullScreenLoader from "@/components/FullScreenLoader";
import { evaluationsCompletedFilter } from "@/lib/filters";
import formatDate from "@/lib/formatDate";
import { calcScore, calcScoreByDimension } from "@/lib/score";
import type { MatrixModel } from "@/services/api/get-matrix.api";
import type {
  ProgramModel,
  ReportModel,
  UserModel,
} from "@/services/api/get-program.api";
import { useGetMatrix } from "@/services/matrix.queries";

const getSheets = (data: ProgramModel, matrix: MatrixModel): Sheet[] => {
  const coverRow = {
    "Denumire program": data.attributes.name,
    "Data de început": formatDate(data.attributes.startDate),
    "Data de final": formatDate(data.attributes.endDate),
    "Nume finanțator": data.attributes.sponsorName || "-",
    "Număr ONG-uri înscrise în program": data.attributes.users?.data?.length,
  };

  const sheets = [
    {
      name: "Informații despre program",
      rows: [coverRow],
      cols: Object.keys(coverRow).map((key) => ({ width: key.length + 3 })),
    },
  ];

  debugger;
  data.attributes.users?.data?.forEach((user: UserModel) => {
    const ongName: string =
      user.attributes.ongName.length > 23
        ? user.attributes.ongName.slice(0, 23) + "..."
        : user.attributes.ongName;

    const rows: any[] = [];

    user.attributes.reports?.data.forEach((report: ReportModel) => {
      const evaluationsCompleted = evaluationsCompletedFilter(
        report.attributes.evaluations.data
      );

      const scoreByEvaluation =
        matrix && evaluationsCompleted.length
          ? calcScoreByDimension({ evaluationsCompleted, matrix, sort: false })
          : [];

      if (!scoreByEvaluation.length) {
        return;
      }

      const totalScore = calcScore(evaluationsCompleted);

      const row: Record<string, any> = {
        // NGO
        "Nume ONG": user.attributes.ongName,
        "Domeniu de activitate": "–", // TODO: get from relationship
        "Nume reprezentant": `${user.attributes.contactFirstName} ${user.attributes.contactLastName}`,
        "Email reprezentant": user.attributes.contactEmail,

        // Report
        "Dată intrare program": "-", // TODO: add created_at to up_users_program_links table
        "Dată început evaluare": formatDate(report.attributes.createdAt),
        "Dată final evaluare": formatDate(report.attributes.deadline),
        "Număr de completări": evaluationsCompleted.length,

        // Evaluation
        "ID evaluare": report.id, // TODO: CHECK
        "Scor total obținut": totalScore,
      };

      scoreByEvaluation?.forEach(({ name, score }, index) => {
        row[`Scor ${name}`] = score;
        row[`Comentariu ${name}`] = evaluationsCompleted
          .map((evaluation: any) => evaluation.dimensions[index].comment)
          .join("\n---\n");
      });

      rows.push(row);
    });

    if (!rows.length) {
      return;
    }

    sheets.push({
      name: `Date ${ongName}`,
      rows,
      cols: Object.keys(rows[0]).map((key) => ({ width: key.length + 3 })),
    });
  });

  return sheets;
};

const ExportProgram = ({ data }: { data: ProgramModel }) => {
  const { isLoading, data: matrix } = useGetMatrix();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ExportXLSX
      className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"
      fileName={`${data.attributes.name}.xlsx`}
      getSheets={() => getSheets(data, matrix!)}
    />
  );
};

export default ExportProgram;
