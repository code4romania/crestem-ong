import React from "react";
import { useSelector } from "react-redux";
import Heading from "@/components/Heading";
import Section from "@/components/Section";

const rate = ["Nu există", "Limitat", "Parțial", "Clar", "Cuprinzător"];

const EvaluationResults = ({ evaluationData }) => {
  const matrix = useSelector((state) => state.userState.matrix);
  const dimensions = evaluationData.dimensions;
  return (
    <Section className="py-8">
      <div className="space-y-6">
        {matrix.map((dimension, dimensionIndex) => (
          <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
            <div
              className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6"
              key={dimension.id}
            >
              <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2">
                  <h3 className="text-base font-semibold leading-6 text-gray-900 text-xl">
                    {dimensionIndex + 1}. {dimension.name}
                  </h3>
                </div>
                <div className="ml-4 mt-2 flex-shrink-0 text-xl">
                  {dimension.quiz.reduce(
                    (acc, quiz, quizIndex) =>
                      acc +
                      dimensions[dimensionIndex].quiz[quizIndex].answer +
                      1,
                    0
                  )}{" "}
                  / 25
                </div>
              </div>
              <div className="mt-6">
                <table className="w-full table-auto divide-y divide-gray-300">
                  <tbody>
                    {dimension.quiz.map((quiz, quizIndex) => (
                      <tr className="even:bg-gray-50" key={quiz.id}>
                        <td className="w-1/2 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                          <b>
                            {dimensionIndex + 1}.{quizIndex + 1}.
                          </b>{" "}
                          {quiz.question}
                        </td>
                        <td className="w-1/2 px-3 py-4 text-sm text-gray-500">
                          <b>
                            {dimensions[dimensionIndex].quiz[quizIndex].answer +
                              1}{" "}
                            / 5 -{" "}
                            {
                              rate[
                                dimensions[dimensionIndex].quiz[quizIndex]
                                  .answer
                              ]
                            }
                          </b>{" "}
                          <i>
                            (
                            {
                              quiz[
                                `option_${
                                  dimensions[dimensionIndex].quiz[quizIndex]
                                    .answer + 1
                                }`
                              ]
                            }
                            )
                          </i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {dimension.comment && <div>Comentariu: {dimension.comment}</div>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default EvaluationResults;
