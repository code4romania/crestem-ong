import ExportXLSX from "@/components/ExportXLSX";
import FullScreenLoader from "@/components/FullScreenLoader";
import type { CellData, Sheet } from "@/lib/excel";
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
  const sheets: Sheet[] = [
    {
      name: "Informații despre program",
      data: [
        [
          { value: "Denumire program", bold: true },
          { value: "Data de început", bold: true },
          { value: "Data de final", bold: true },
          { value: "Nume finanțator", bold: true },
          { value: "Număr ONG-uri înscrise în program", bold: true },
        ],
        [
          data.name,
          formatDate(data.startDate),
          formatDate(data.endDate),
          data.sponsorName || "-",
          data.users?.length,
        ],
      ],
    },
  ];

  data.users?.forEach((user: FinalUserModel) => {
    const ongName: string =
      user.ongName.length > 23
        ? user.ongName.slice(0, 23) + "..."
        : user.ongName;

    const headerRow: CellData[] = [
      { value: "Nume ONG", bold: true },
      { value: "CUI", bold: true },
      { value: "Domeniu de activitate", bold: true },
      { value: "Nume reprezentant", bold: true },
      { value: "Email reprezentant", bold: true },
      { value: "Dată intrare program", bold: true },
      { value: "Dată început evaluare", bold: true },
      { value: "Dată final evaluare", bold: true },
      { value: "Număr de completări", bold: true },
      { value: "ID evaluare", bold: true },
      { value: "Scor total obținut", bold: true },
    ];

    const data: CellData[][] = [];

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

      const row: CellData[] = [
        // NGO
        user.ongName,
        user.ongIdentificationNumber,
        user.domains?.map((d) => d.name).join(", ") || "-",
        `${user.contactFirstName} ${user.contactLastName}`,
        user.contactEmail,

        // Report
        "-", // TODO: add created_at to up_users_program_links table
        formatDate(report.createdAt),
        formatDate(report.deadline),
        evaluationsCompleted.length,

        // Evaluation
        report.id,
        totalScore,
      ];

      scoreByEvaluation?.forEach(({ name, score }, index) => {
        headerRow.push({ value: `Scor ${name}`, bold: true });
        headerRow.push({ value: `Comentariu ${name}`, bold: true });
        row.push(score);
        row.push(
          evaluationsCompleted
            .map((evaluation) => evaluation.dimensions[index].comment)
            .join("\n---\n")
        );
      });

      data.push(row);
    });

    if (!data.length) {
      return;
    }

    sheets.push({
      name: `Date ${user.id} - ${ongName}`,
      data: [headerRow, ...data],
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
