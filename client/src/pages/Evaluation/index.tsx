import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import { useGetEvaluationQuery, userApi } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useSubmitEvaluationMutation } from "@/redux/api/userApi";
import StartEvaluation from "@/components/StartEvaluation";
import EvaluationFinished from "@/components/EvaluationFinished";
import Heading from "@/components/Heading";
import Section from "@/components/Section";

const evaluationSchema = object({
  question_1: string(),
  question_2: string(),
  question_3: string(),
  question_4: string(),
  question_5: string(),
  comment: string().max(1000),
});

export type EvaluationInput = TypeOf<typeof evaluationSchema> & {
  evaluationId: string;
  dimensionIndex: string;
};

const createEvaluation = (data: EvaluationInput) => ({
  quiz: [
    {
      answer: data.question_1,
    },
    {
      answer: data.question_2,
    },
    {
      answer: data.question_3,
    },
    {
      answer: data.question_4,
    },
    {
      answer: data.question_5,
    },
  ],
  comment: data.comment,
});

const Evaluation = () => {
  const [evaluationIndex, setEvaluationIndex] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  const { evaluationId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const emailParam = searchParams.get("email");
  const [email, setEmail] = useState(null);
  const { handleSubmit, register, reset } = useForm<EvaluationInput>({
    resolver: zodResolver(evaluationSchema),
  });

  const { data: matrixData, isLoading: isMatrixLoading } =
    userApi.endpoints.getMatrix.useQuery(null, {
      skip: false,
      refetchOnMountOrArgChange: true,
    });

  const {
    isLoading: isEvaluationLoading,
    isSuccess: isEvaluationSuccess,
    data: evaluationData,
    isError: isEvaluationError,
  } = useGetEvaluationQuery({ evaluationId, email: emailParam });

  const [
    submitEvaluation,
    {
      isLoading: isSubmitLoading,
      isError: isSubmitError,
      error: errorSubmit,
      isSuccess: isSubmitSuccess,
    },
  ] = useSubmitEvaluationMutation();

  useEffect(() => {
    if (evaluationData?.dimensions) {
      setEvaluationIndex(evaluationData.dimensions.length + 1);
    }
  }, [evaluationData?.dimensions]);

  useEffect(() => {
    if (isEvaluationSuccess) {
      setEvaluations(evaluationData?.dimensions);
    }
  }, [isEvaluationSuccess, evaluationData?.dimensions]);

  useEffect(() => {
    if (isSubmitSuccess) {
      setEvaluationIndex((state) => state + 1);
    }
  }, [isSubmitSuccess]);

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  const onSubmitHandler = (data: EvaluationInput) => {
    submitEvaluation({
      dimensions: [...evaluations, createEvaluation(data)],
      evaluationId,
      dimensionIndex,
    });
    setEvaluations((state) => [...state, createEvaluation(data)]);
    reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClickStart = useCallback(() => {
    setHasStarted(true);
  }, [setHasStarted]);

  const dimensionIndex = evaluationData?.dimensions?.length + 1;
  const dimension = matrixData && matrixData[+evaluationIndex - 1];

  if (!(email || emailParam)) {
    return false;
  }

  if (
    !(dimension && evaluationIndex && evaluationData) &&
    (isMatrixLoading || isEvaluationLoading)
  ) {
    return <FullScreenLoader />;
  }

  if (evaluations?.length === 0 && !hasStarted) {
    return <StartEvaluation onClick={handleClickStart} />;
  }

  if (evaluations?.length === matrixData?.length) {
    return <EvaluationFinished />;
  }

  if (isEvaluationError || evaluationData?.email !== email) {
    return <Navigate to="/" />;
  }

  return (
    <form
      className="w-full flex flex-col mt-12"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div>
        <Heading level="h2">{dimension.name}</Heading>
        <p className="mt-4">{dimension.description}</p>
      </div>
      <div className="mt-4">
        {dimension.quiz.map(({ id, question, ...quiz }, questionIndex) => (
          <div key={id} className="mt-4">
            <label className="text-base font-semibold leading-6 text-gray-900">
              {question}
            </label>
            <fieldset className="mt-4">
              <div className="space-y-4">
                {[...Array(5).keys()].map((index) => (
                  <div className="flex items-center" key={index}>
                    <input
                      id={`${id}-option_${index + 1}`}
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
                      value={index}
                      {...register(`question_${questionIndex + 1}`)}
                    />
                    <label
                      htmlFor={`${id}-option_${index + 1}`}
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      {quiz[`option_${index + 1}`]}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        ))}
      </div>
      <Section>
        <p className={"text-base font-semibold leading-6 text-gray-900 mb-2"}>
          Te rugăm să argumentezi selecțiile făcute pentru indicatorul{" "}
          {dimension.name}
        </p>
        <textarea
          className="rounded-md border-gray-300 w-full"
          {...register("comment")}
        />
      </Section>
      <Section>
        <div className="flex">
          {evaluationIndex !== 10 && evaluationIndex && (
            <Pagination step={evaluationIndex} />
          )}
          <div className="ml-auto">
            <Button type={"submit"}>
              {evaluationIndex !== 10 ? "Continuă" : "Trimite"}
            </Button>
          </div>
        </div>
      </Section>
    </form>
  );
};

export default Evaluation;
