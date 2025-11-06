import type {
  FinalDetailedUserModel,
  FinalDimensionModel,
  FinalEvaluationModel,
  FinalMatrixModel,
} from "@/services/api/types";
import { downloadDataToXLSX } from "./utils";
import formatDate from "./formatDate";
import type { ReportVM } from "@/pages/NgoDetails/components/type";
import { calcScoreByDimension } from "./score";

export function exportReport(
  ngo: FinalDetailedUserModel,
  matrix: FinalMatrixModel,
  report: ReportVM
) {
  downloadDataToXLSX(`evaluare-${report.id}.xlsx`, () => [
    {
      name: `evaluare-${report.id}`,
      rows: [
        ["Date Generale", ""],
        ["ID", report.id],
        ["Nume ONG:", ngo.ongName],
        ["CIF:", ngo.ongIdentificationNumber],
        ["Dată început", formatDate(report.createdAt)],
        ["Dată final", formatDate(report.deadline)],
        ["Scor obținut", report.score],
        [
          "Număr completări",
          `${report.numberOfCompletedEvaluations} / ${report.totalEvaluations}`,
        ],
        [
          "Nume persoană de contact organizație:",
          [ngo.contactFirstName, ngo.contactLastName]
            .filter(Boolean)
            .join(" ") || "N/A",
        ],
        ["Email persoană de contact organizație:", ngo.contactEmail || "N/A"],
        ["Program", ngo.program?.name || "N/A"],
        [
          "Expert alocat (persoană resursă FDSC):",
          [
            ngo.mentors
              ?.map(
                (mentor) =>
                  [mentor?.firstName, mentor?.lastName]
                    .filter(Boolean)
                    .join(" ") || "N/A"
              )
              .join(", ") || "N/A",
          ],
        ],
        [],
        ["Rezultate Generale pe dimensiuni"],
        ...calcScoreByDimension({
          matrix,
          evaluationsCompleted: report.completedEvaluations,
        }).map((dimension) => [
          dimension.name,
          `${dimension.score?.toFixed(2)} %` || "N/A",
        ]),
        [
          "",
          ...report.completedEvaluations.map((e, idx) => `Evaluare ${idx + 1}`),
        ],
        ["", ...report.completedEvaluations.map((e) => e.email)],
        ...getDimensionsData(matrix.dimensions, report.completedEvaluations),
      ],
      cols: [{ width: 40 }, { width: 40 }],
    },
  ]);
}

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
