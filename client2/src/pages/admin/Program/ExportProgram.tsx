import ExportXLSX, { type Sheet } from "@/components/ExportXLSX";
import formatDate from "@/lib/formatDate";
import { evaluationsCompletedFilter } from "@/lib/filters";
import { calcScore, calcScoreByDimension } from "@/lib/score";
import { useAppSelector } from "@/redux/store";
import { userApi } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import type { Matrix } from "@/redux/api/types";

export interface Program {
  name: string;
  sponsorName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  startDate: string;
  endDate: string;
  users: unknown[];
  mentors: unknown[];
}

const getSheets = (data: Program, matrix: Matrix): Sheet[] => {
  const coverRow = {
    "Denumire program": data.name,
    "Data de început": formatDate(data.startDate),
    "Data de final": formatDate(data.endDate),
    "Nume finanțator": data.sponsorName || "-",
    "Număr ONG-uri înscrise în program": data.users?.length,
  };

  const sheets = [
    {
      name: "Informații despre program",
      rows: [coverRow],
      cols: Object.keys(coverRow).map((key) => ({ width: key.length + 3 })),
    },
  ];

  data.users.forEach((user: any) => {
    const ongName: string =
      user.ongName.length > 23
        ? user.ongName.slice(0, 23) + "..."
        : user.ongName;

    const rows = [];

    user.reports.forEach((report: any) => {
      const evaluationsCompleted = evaluationsCompletedFilter(
        report?.evaluations
      );

      const scoreByEvaluation =
        matrix && evaluationsCompleted.length
          ? calcScoreByDimension({ evaluationsCompleted, matrix, sort: false })
          : [];

      if (!scoreByEvaluation.length) {
        return;
      }

      const totalScore = calcScore(evaluationsCompleted);

      const row = {
        // NGO
        "Nume ONG": user.ongName,
        "Domeniu de activitate": "–", // TODO: get from relationship
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

      scoreByEvaluation.forEach(({ name, score }, index) => {
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

const ExportProgram = ({ data }: { data: Program }) => {
  const matrix = useAppSelector((state) => state.userState.matrix);
  const { isLoading } = userApi.endpoints.getMatrix.useQuery(null, {
    skip: !!matrix,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ExportXLSX
      className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"
      fileName={`${data.name}.xlsx`}
      sheets={getSheets(data, matrix)}
    />
  );
};

export default ExportProgram;
