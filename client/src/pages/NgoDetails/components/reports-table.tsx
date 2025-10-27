import { DataTable } from "@/components/ui/data-table";
import formatDate from "@/lib/formatDate";
import { calcScore, calcScoreByDimension } from "@/lib/score";
import { downloadDataToXLSX } from "@/lib/utils";
import type {
  FinalDetailedUserModel,
  FinalDimensionModel,
  FinalEvaluationModel,
  FinalReportModel,
} from "@/services/api/types";
import { useSuspenseGetMatrix } from "@/services/matrix.queries";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { reportsColumns } from "./reports-columns";
import type { ReportVM } from "./type";

function getDimensionsData(
  dimensions: FinalDimensionModel[],
  completedEvaluations: FinalEvaluationModel[]
): string[][] {
  const data: string[][] = [];

  for (const { dimension, dimensionIndex } of dimensions.map(
    (dimension, dimensionIndex) => ({ dimension, dimensionIndex })
  )) {
    const row = [`${dimensionIndex + 1}. ${dimension.name}`];
    const comments = ["Argumentare"];
    for (const evaluation of completedEvaluations) {
      const score = dimension.quiz.reduce(
        (acc, _, quizIndex) =>
          acc +
          evaluation.dimensions[dimensionIndex].quiz[quizIndex].answer +
          1,
        0
      );

      row.push(`${score} / 25`);
      comments.push(evaluation.dimensions[dimensionIndex].comment);
    }
    data.push(row);

    for (const { question, questionIndex } of dimension.quiz.map(
      (question, questionIndex) => ({ question, questionIndex })
    )) {
      const row = [
        `${dimensionIndex + 1}. ${questionIndex + 1}. ${question.question}`,
      ];

      for (const evaluation of completedEvaluations) {
        row.push(
          `${
            evaluation.dimensions[dimensionIndex].quiz[questionIndex].answer + 1
          }/5`
        );
      }

      data.push(row);
    }
    data.push(comments);
  }
  return data;
}

function NgoReportsTable({
  ngo,
  reports,
}: {
  ngo: FinalDetailedUserModel;
  reports?: FinalReportModel[];
}) {
  const { data: matrix } = useSuspenseGetMatrix();
  const data = useMemo(() => {
    return (
      reports?.map((report) => {
        const completedEvaluations = report.evaluations
          ? report.evaluations.filter(
              ({ dimensions }) => dimensions.length === 10
            )
          : [];

        return {
          id: report.id,
          createdAt: report.createdAt,
          deadline: report.deadline,
          finished: report.finished,
          numberOfCompletedEvaluations: completedEvaluations.length,
          totalEvaluations: report.evaluations.length,
          completedEvaluations,
          score:
            completedEvaluations.length > 0
              ? report.finished
                ? `${calcScore(completedEvaluations)}%`
                : "-"
              : "-",
        };
      }) ?? []
    );
  }, [reports]);

  const downloadEvaluation = useCallback(
    (report: ReportVM) => {
      downloadDataToXLSX("evaluari.xlsx", () => [
        {
          name: "evaluari",
          rows: [
            ["Date Generale", ""],
            ["Nume ONG:", ngo.ongName],
            ["CIF:", ngo.ongIdentificationNumber],
            ["Dată început", formatDate(report.createdAt)],
            ["Dată final", formatDate(report.deadline)],
            ["Scor obținut", report.score],
            ["Număr completări", report.numberOfCompletedEvaluations],
            [
              "Nume persoană de contact organizație:",
              [ngo.contactFirstName, ngo.contactLastName]
                .filter(Boolean)
                .join(" ") ?? "-",
            ],
            ["Email persoană de contact organizație:", ngo.contactEmail ?? "-"],
            ["Program", ngo.program?.name ?? "-"],
            [
              "Expert alocat (persoană resursă FDSC):",
              [ngo.mentor?.firstName, ngo.mentor?.lastName]
                .filter(Boolean)
                .join(" ") ?? "-",
            ],
            [],
            ["Rezultate Generale pe dimensiuni"],
            ...calcScoreByDimension({
              matrix,
              evaluationsCompleted: report.completedEvaluations,
            }).map((dimension) => [
              dimension.name,
              dimension.score?.toFixed(2) || "-",
            ]),
            [
              "",
              ...report.completedEvaluations.map(
                (e, idx) => `Evaluare ${idx + 1}`
              ),
            ],
            ["", ...report.completedEvaluations.map((e) => e.email)],
            ...getDimensionsData(
              matrix.dimensions,
              report.completedEvaluations
            ),
          ],
          cols: [{ width: 40 }, { width: 40 }],
        },
      ]);
    },
    [ngo, matrix]
  );

  const columns = useMemo(
    () => reportsColumns(ngo.id, downloadEvaluation),
    [ngo, downloadEvaluation]
  );

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTable table={table} emptyMessage="Nu există evaluări"></DataTable>
  );
}

export default NgoReportsTable;
