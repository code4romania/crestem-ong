import { Evaluation, Matrix, Quiz } from "@/redux/api/types";

const addQuizToQuiz = (
  obj1: Record<string, Quiz>,
  obj2: Record<string, Quiz>
) =>
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

export const calcScore = (evaluations): number => {
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
  return Math.round(score) || 0;
};

export const calcScoreByDimension = ({
  matrix,
  evaluationsCompleted,
  sort = true,
}: {
  evaluationsCompleted: Evaluation[];
  matrix: Matrix;
  sort?: boolean;
}) => {
  if (!matrix) {
    return undefined;
  }
  const object = evaluationsCompleted.reduce(
    (acc, evaluation) =>
      addQuizToQuiz(
        acc,
        evaluation.dimensions.reduce(
          (acc, dimension, index) => ({
            ...acc,
            [index]: {
              score:
                dimension.quiz.reduce((acc, quiz) => acc + quiz.answer, 0) / 5,
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
    // @ts-ignore
    [...Array(10).keys()].reduce((acc, index) => ({ ...acc, [index]: 0 }), {})
  );

  return Object.keys(object)
    .sort( (a, b) => sort ? object[b].score - object[a].score : 0 )
    .map((index) => {
      const score = Math.floor(
        (object[index].score * 25) / evaluationsCompleted.length
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
      ].sort((a, b) => (a.score === b.score ? 0 : a.score > b.score ? -1 : 1));

      return {
        id: index,
        name: matrix[index].name,
        link: matrix[index].link,
        score: score,
        tags:
          score >= 50
            ? tags.slice(0, 3).map(({ quiz }) => quiz)
            : tags.slice(2, 5).map(({ quiz }) => quiz),
      };
    });
};
