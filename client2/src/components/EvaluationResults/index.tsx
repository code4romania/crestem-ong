import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type {
  FinalEvaluationModel,
  FinalQuizModel,
} from "@/services/api/types";
import { useSuspenseGetMatrix } from "@/services/matrix.queries";

const rate = ["Nu există", "Limitat", "Parțial", "Clar", "Cuprinzător"];

export interface EvaluationResultsProps {
  evaluationData: FinalEvaluationModel;
}

const EvaluationResults = ({ evaluationData }: EvaluationResultsProps) => {
  const { data: matrix } = useSuspenseGetMatrix((d) => d.dimensions);
  const dimensions = evaluationData.dimensions;

  return (
    <Section className="py-8">
      <div className="space-y-6">
        {matrix.map((dimension, dimensionIndex) => {
          const score = dimension.quiz.reduce(
            (acc, quiz, quizIndex) =>
              acc + dimensions[dimensionIndex].quiz[quizIndex].answer + 1,
            0
          );

          return (
            <Card key={dimension.id} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  {dimensionIndex + 1}. {dimension.name}
                </CardTitle>
                <div className="text-xl font-medium">{score} / 25</div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {dimension.quiz.map((quiz, quizIndex) => {
                      const answerIndex =
                        dimensions[dimensionIndex].quiz[quizIndex].answer;
                      const answerLabel = rate[answerIndex];
                      const answerValue = answerIndex + 1;

                      return (
                        <TableRow key={quiz.id} className="even:bg-muted/50">
                          <TableCell className="w-1/2 font-medium align-top">
                            <b>
                              {dimensionIndex + 1}.{quizIndex + 1}.
                            </b>{" "}
                            {quiz.question}
                          </TableCell>
                          <TableCell className="w-1/2 align-top ">
                            <div className="text-sm text-gray-700 text-wrap">
                              <b>
                                {answerValue} / 5 - {answerLabel}
                              </b>{" "}
                              <i>
                                (
                                {
                                  quiz[
                                    `option_${answerValue}` as keyof FinalQuizModel
                                  ]
                                }
                                )
                              </i>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                {dimensions[dimensionIndex].comment && (
                  <div className="mt-4 text-sm">
                    <b>Argumentare:</b> {dimensions[dimensionIndex].comment}
                  </div>
                )}

                <Separator className="mt-4" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

export default EvaluationResults;
