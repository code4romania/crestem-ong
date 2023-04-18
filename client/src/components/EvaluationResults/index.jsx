import React from "react";
import { useSelector } from "react-redux";
import Heading from "@/components/Heading";
import Section from "@/components/Section";

const EvaluationResults = ({ evaluationData }) => {
  const matrix = useSelector((state) => state.userState.matrix);
  const dimensions = evaluationData.dimensions;
  return (
    <Section className="py-8">
      {matrix.map((dimension, dimensionIndex) => (
        <div className="mt-6" key={dimension.id}>
          <Heading level={"h2"}>{dimension.name}</Heading>
          <div className="mt-4">
            {dimension.quiz.map((quiz, quizIndex) => (
              <div className="mt-4" key={quiz.id}>
                <div className={"font-bold"}>{quiz.question}</div>
                <div>
                  {
                    quiz[
                      `option_${
                        dimensions[dimensionIndex].quiz[quizIndex].answer + 1
                      }`
                    ]
                  }
                </div>
              </div>
            ))}
          </div>
          {dimension.comment && <div>Comentariu: {dimension.comment}</div>}
        </div>
      ))}
    </Section>
  );
};

export default EvaluationResults;
