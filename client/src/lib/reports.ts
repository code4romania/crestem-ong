import type {
  FinalDetailedUserModel,
  FinalDimensionModel,
  FinalEvaluationModel,
  FinalMatrixModel,
} from "@/services/api/types";
import { downloadDataToXLSX, type CellData } from "./excel";
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
      data: [
        [{ value: "Date Generale", bold: true }, { value: "" }],
        [{ value: "ID", bold: true }, report.id],
        [{ value: "Nume ONG:", bold: true }, ngo.ongName],
        [{ value: "CIF:", bold: true }, ngo.ongIdentificationNumber],
        [{ value: "Dată început", bold: true }, formatDate(report.createdAt)],
        [{ value: "Dată final", bold: true }, formatDate(report.deadline)],
        [{ value: "Scor obținut", bold: true }, report.score],
        [
          {
            value: "Număr completări",
            bold: true,
          },
          `${report.numberOfCompletedEvaluations} / ${report.totalEvaluations}`,
        ],
        [
          { value: "Nume persoană de contact organizație:", bold: true },
          [ngo.contactFirstName, ngo.contactLastName]
            .filter(Boolean)
            .join(" ") || "N/A",
        ],
        [
          { value: "Email persoană de contact organizație:", bold: true },
          ngo.contactEmail || "N/A",
        ],
        [
          { value: "Programe", bold: true },
          ngo.ngoPrograms?.map((p) => p.name).join(", ") || "N/A",
        ],
        [
          { value: "Experți alocați (persoane resurse FDSC):", bold: true },
          ngo.ngoPrograms?.length
            ? ngo.mentors
                ?.map(
                  (mentor) =>
                    [mentor?.firstName, mentor?.lastName]
                      .filter(Boolean)
                      .join(" ") || "N/A"
                )
                .join(", ")
            : "N/A",
        ],
        [],
        [{ value: "Rezultate Generale pe dimensiuni", bold: true }],
        ...calcScoreByDimension({
          matrix,
          evaluationsCompleted: report.completedEvaluations,
        }).map((dimension) => [
          { value: dimension.name, bold: true },
          `${dimension.score?.toFixed(0)} %` || "N/A",
        ]),
        [
          "",
          ...report.completedEvaluations.map((e, idx) => ({
            value: `Evaluare ${idx + 1}`,
            bold: true,
          })),
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
): CellData[][] {
  const data: CellData[][] = [];

  for (const { dimension, dimensionIndex } of dimensions.map(
    (dimension, dimensionIndex) => ({ dimension, dimensionIndex })
  )) {
    const row: CellData[] = [
      { value: `${dimensionIndex + 1}. ${dimension.name}`, bold: true },
    ];
    const comments: CellData[] = [{ value: "Argumentare", italic: true }];
    for (const evaluation of completedEvaluations) {
      const score = dimension.quiz.reduce(
        (acc, _, quizIndex) =>
          acc +
          evaluation.dimensions[dimensionIndex].quiz[quizIndex].answer +
          1,
        0
      );

      row.push({ value: `${score} / 25`, bold: true, italic: true });
      comments.push(evaluation.dimensions[dimensionIndex].comment);
    }
    data.push(row);

    for (const { question, questionIndex } of dimension.quiz.map(
      (question, questionIndex) => ({ question, questionIndex })
    )) {
      const row: CellData[] = [
        {
          value: `${dimensionIndex + 1}. ${questionIndex + 1}. ${
            question.question
          }`,
          italic: true,
        },
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
