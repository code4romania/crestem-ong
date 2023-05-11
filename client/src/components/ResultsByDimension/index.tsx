import React, { useMemo } from "react";
import { userApi } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import ProgressBar from "../ProgressBar";
import goodIcon from "@/assets/good.svg";
import badIcon from "@/assets/bad.svg";

const add = (obj1, obj2) =>
  Object.keys(obj1).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        score: obj1[key].score
          ? obj1[key].score + obj2[key].score
          : obj2[key].score,
        option1: obj1[key].option1
          ? obj1[key].option1 + obj2[key].option1
          : obj2[key].option1,
        option2: obj1[key].option2
          ? obj1[key].option2 + obj2[key].option2
          : obj2[key].option2,
        option3: obj1[key].option3
          ? obj1[key].option3 + obj2[key].option3
          : obj2[key].option3,
        option4: obj1[key].option4
          ? obj1[key].option4 + obj2[key].option4
          : obj2[key].option4,
        option5: obj1[key].option5
          ? obj1[key].option5 + obj2[key].option5
          : obj2[key].option5,
      },
    }),
    {}
  );

const ResultsByDimension = ({ evaluations }) => {
  const matrix = useSelector((state) => state.userState.matrix);
  const { isLoading } = userApi.endpoints.getMatrix.useQuery(null, {
    skip: !!matrix,
    refetchOnMountOrArgChange: true,
  });

  const scoreByEvaluation = useMemo(() => {
    if (!matrix) {
      return null;
    }
    const object = evaluations.reduce(
      (acc, evaluation) =>
        add(
          acc,
          evaluation.dimensions.reduce(
            (acc, dimension, index) => ({
              ...acc,
              [index]: {
                score:
                  dimension.quiz.reduce((acc, quiz) => acc + quiz.answer, 0) /
                  5,
                option1: dimension.quiz[0]?.answer || 0,
                option2: dimension.quiz[1]?.answer || 0,
                option3: dimension.quiz[2]?.answer || 0,
                option4: dimension.quiz[3]?.answer || 0,
                option5: dimension.quiz[4]?.answer || 0,
              },
            }),
            {}
          )
        ),
      [...Array(10).keys()].reduce((acc, index) => ({ ...acc, [index]: 0 }), {})
    );
    return Object.keys(object)
      .sort((a, b) =>
        object[a].score === object[b].score
          ? 0
          : object[a].score < object[b].score
          ? -1
          : 1
      )
      .map((index) => {
        const score = Math.floor(
          (object[index].score * 25) / evaluations.length
        );
        const quiz1 = Math.floor(
          (object[index].option1 * 25) / evaluations.length
        );
        const tags = [
          {
            quiz: matrix[index].quiz[0].tag,
            score: object[index].option1,
          },
          {
            quiz: matrix[index].quiz[1].tag,
            score: object[index].option2,
          },
          {
            quiz: matrix[index].quiz[2].tag,
            score: object[index].option3,
          },
          {
            quiz: matrix[index].quiz[3].tag,
            score: object[index].option4,
          },
          {
            quiz: matrix[index].quiz[4].tag,
            score: object[index].option5,
          },
        ].sort((a, b) =>
          a.score === b.score ? 0 : a.score > b.score ? -1 : 1
        );

        return {
          id: index,
          name: matrix[index].name,
          score: score,
          tags:
            score >= 50
              ? tags.slice(0, 3).map(({ quiz }) => quiz)
              : tags.slice(2, 5).map(({ quiz }) => quiz),
        };
      });
  }, [evaluations, matrix]);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="mt-10">
      <div className={"flex justify-between mb-4"}>
        <div className="font-medium text-lg">Rezultate pe dimensiuni</div>
      </div>
      <div className="space-y-6">
        {scoreByEvaluation?.map(({ id, name, score, tags }, i) => (
          <div key={id} className="flex space-x-12 items-end">
            <div className="md:w-1/2">
              <ProgressBar label={name} percentage={score} />
            </div>
            <div className="md:w-1/2 flex space-x-4 text-sm">
              {score < 50 ? <img src={badIcon} /> : <img src={goodIcon} />}
              <div>
                {tags.map((tag, i) => (
                  <span key={i}>
                    {tag}
                    {i !== 2 && "; "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsByDimension;
