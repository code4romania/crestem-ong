import React from "react";
import { userApi } from "../../redux/api/userApi";
import Button from "../Button";
import { useSelector } from "react-redux";
import ProgressBar from "../ProgressBar";

const add = (obj1, obj2) =>
  Object.keys(obj1).reduce(
    (acc, key) => ({ ...acc, [key]: obj1[key] + obj2[key] }),
    {}
  );

const ResultsByDimension = ({ evaluations }) => {
  const matrix = useSelector((state) => state.userState.matrix);
  const { isLoading } = userApi.endpoints.getMatrix.useQuery(null, {
    skip: !!matrix,
    refetchOnMountOrArgChange: true,
  });

  const scoreByEvaluation = evaluations.reduce(
    (acc, evaluation) =>
      add(
        acc,
        evaluation.dimensions.reduce(
          (acc, dimension, index) => ({
            ...acc,
            [index]:
              dimension.quiz.reduce((acc, quiz) => acc + quiz.answer, 0) / 5,
          }),
          {}
        )
      ),
    [...Array(10).keys()].reduce((acc, index) => ({ ...acc, [index]: 0 }), {})
  );

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="mt-10">
      <div className={"flex justify-between mb-4"}>
        <div className="font-medium text-lg">Rezultate pe dimensiuni</div>
        {/*<Button>Descarca</Button>*/}
      </div>
      <div className="space-y-6 md:w-1/2">
        {matrix?.map(({ id, name }, i) => (
          <ProgressBar
            key={id}
            label={name}
            percentage={Math.floor(
              (scoreByEvaluation[i] * 25) / evaluations.length
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsByDimension;
