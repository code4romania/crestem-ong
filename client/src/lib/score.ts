export const calcScore = (evaluations) => {
  const score =
    evaluations.reduce(
      (acc, curr) =>
        acc +
        curr.dimensions.reduce(
          (acc, curr) =>
            acc + curr.quiz.reduce((acc, curr) => acc + curr.answer, 0),
          0
        ),
      0
    ) /
    (2 * evaluations.length);
  return score ? `${Math.round(score)}%` : "-";
};
