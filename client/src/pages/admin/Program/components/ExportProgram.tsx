import ExportXLSX, { type Sheet } from "@/components/ExportXLSX";
import FullScreenLoader from "@/components/FullScreenLoader";
import { evaluationsCompletedFilter } from "@/lib/filters";
import formatDate from "@/lib/formatDate";
import { calcScore, calcScoreByDimension } from "@/lib/score";
import type {
  FinalMatrixModel,
  FinalProgramModel,
  FinalReportModel,
  FinalUserModel,
} from "@/services/api/types";
import { useGetMatrix } from "@/services/matrix.queries";

const getSheets = (
  data: FinalProgramModel,
  matrix: FinalMatrixModel
): Sheet[] => {
  const coverRow = {
    "Denumire program": data.name,
    "Data de început": formatDate(data.startDate),
    "Data de final": formatDate(data.endDate),
    "Nume finanțator": data.sponsorName || "-",
    "Număr ONG-uri înscrise în program": data.users?.length,
  };

  const sheets: {
    name: string;
    rows: Record<string, string | number>[];
    cols: { width: number }[];
  }[] = [
    {
      name: "Informații despre program",
      rows: [coverRow],
      cols: Object.keys(coverRow).map((key) => ({ width: key.length + 3 })),
    },
  ];

  data.users?.forEach((user: FinalUserModel) => {
    const ongName: string =
      user.ongName.length > 23
        ? user.ongName.slice(0, 23) + "..."
        : user.ongName;

    const rows: Record<string, string | number>[] = [];

    user.reports?.forEach((report: FinalReportModel) => {
      const evaluationsCompleted = evaluationsCompletedFilter(
        report.evaluations
      );

      const scoreByEvaluation =
        matrix && evaluationsCompleted.length
          ? calcScoreByDimension({ evaluationsCompleted, matrix, sort: false })
          : [];

      if (!scoreByEvaluation.length) {
        return;
      }

      const totalScore = calcScore(evaluationsCompleted);

      const row: Record<string, string | number> = {
        // NGO
        "Nume ONG": user.ongName,
        CIF: user.ongIdentificationNumber,
        "Domeniu de activitate":
          user.domains?.map((d) => d.name).join(", ") || "-",
        "Nume reprezentant": `${user.contactFirstName} ${user.contactLastName}`,
        "Email reprezentant": user.contactEmail,

        // Report
        "Dată intrare program": "-", // TODO: add created_at to up_users_program_links table
        "Dată început evaluare": formatDate(report.createdAt),
        "Dată final evaluare": formatDate(report.deadline),
        "Număr de completări": evaluationsCompleted.length,

        // Evaluation
        "ID evaluare": report.id, // TODO: CHECK
        "Scor total obținut": totalScore,
      };

      scoreByEvaluation?.forEach(({ name, score }, index) => {
        row[`Scor ${name}`] = score;
        row[`Comentariu ${name}`] = evaluationsCompleted
          .map((evaluation) => evaluation.dimensions[index].comment)
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

const ExportProgram = ({ data }: { data: FinalProgramModel }) => {
  const { isLoading, data: matrix } = useGetMatrix();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ExportXLSX
      className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"
      fileName={`${data.name}.xlsx`}
      getSheets={() => getSheets(data, matrix!)}
    />
  );
};

export default ExportProgram;
