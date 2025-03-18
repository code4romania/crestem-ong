import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import { useGetEvaluationQuery, userApi } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useSubmitEvaluationMutation } from "@/redux/api/userApi";
import ExpiredEvaluation from "@/pages/Evaluation/ExpiredEvaluation";
import StartEvaluation from "@/components/StartEvaluation";
import EvaluationFinished from "@/components/EvaluationFinished";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { ErrorMessage } from "@hookform/error-message";
import { useAppSelector } from "@/redux/store";
import EvaluationResults from "@/components/EvaluationResults";

const invalid_type_error = "Vă rugăm alegeți o opțiune";
const min_message = "Acest câmp este obligatoriu";

const evaluationSchema = object({
  question_1: string({ invalid_type_error }),
  question_2: string({ invalid_type_error }),
  question_3: string({ invalid_type_error }),
  question_4: string({ invalid_type_error }),
  question_5: string({ invalid_type_error }),
  comment: string().min(1, { message: min_message }).max(1000),
});

export type EvaluationInput = TypeOf<typeof evaluationSchema> & {
  evaluationId: string;
  dimensionIndex: string;
};

const createEvaluation = (data: EvaluationInput) => ({
  quiz: [
    {
      answer: +data.question_1,
    },
    {
      answer: +data.question_2,
    },
    {
      answer: +data.question_3,
    },
    {
      answer: +data.question_4,
    },
    {
      answer: +data.question_5,
    },
  ],
  comment: data.comment,
});

const Evaluation = () => {
  const [evaluationIndex, setEvaluationIndex] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  const { evaluationId } = useParams();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email");
  const methods = useForm<EvaluationInput>({
    resolver: zodResolver(evaluationSchema),
  });
  const { handleSubmit, register, reset } = methods;
  const user = useAppSelector((state) => state.userState.user);
  const isFDSC = user?.role?.type === "fdsc";

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
    error: evaluationError,
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
    if (isEvaluationSuccess && evaluationData?.dimensions) {
      setEvaluations(evaluationData.dimensions);
      setEvaluationIndex(evaluationData.dimensions.length);
    }
  }, [isEvaluationSuccess, evaluationData?.dimensions]);

  useEffect(() => {
    if (isSubmitSuccess) {
      setEvaluationIndex((prev) => (prev !== null ? prev + 1 : null));
    }
  }, [isSubmitSuccess]);

  const onSubmitHandler = useCallback(
    (data: EvaluationInput) => {
      const newEvaluation = createEvaluation(data);
      submitEvaluation({
        dimensions: [...evaluations, newEvaluation],
        evaluationId,
        dimensionIndex: evaluationIndex,
      });

      setEvaluations((prev) => [...prev, newEvaluation]);
      reset();
      window.scrollTo(0, 0);
    },
    [evaluations, evaluationId, evaluationIndex, reset, submitEvaluation]
  );

  const handleClickStart = useCallback(() => {
    setHasStarted(true);
    window.scrollTo(0, 0);
  }, []);

  const dimension = useMemo(
    () => matrixData && evaluationIndex !== null && matrixData[evaluationIndex],
    [matrixData, evaluationIndex]
  );

  if (
    !(dimension && evaluationIndex !== null && evaluationData) &&
    (isMatrixLoading || isEvaluationLoading)
  ) {
    return <FullScreenLoader />;
  }

  if (evaluationError?.status === 403) {
    return <Navigate to="/" />;
  }

  if (isFDSC && evaluationData?.dimensions?.length === 10) {
    return <EvaluationResults evaluationData={evaluationData} />;
  }

  if (evaluationError?.status === 401) {
    return <ExpiredEvaluation error={evaluationError} />;
  }

  if (!hasStarted && evaluations.length === 0) {
    return <StartEvaluation onClick={handleClickStart} />;
  }

  if (evaluations.length === matrixData?.length) {
    return <EvaluationFinished />;
  }

  if (isSubmitLoading) {
    return <FullScreenLoader />;
  }

  return (
    <FormProvider {...methods}>
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
                  <div className="text-red-600 text-sm">
                    <ErrorMessage name={`question_${questionIndex + 1}`} />
                  </div>
                </div>
              </fieldset>
            </div>
          ))}
        </div>
        <Section>
          <p className="text-base font-semibold leading-6 text-gray-900 mb-2">
            Te rugăm să argumentezi selecțiile făcute pentru indicatorul{" "}
            {dimension.name}
          </p>
          <textarea
            className="rounded-md border-gray-300 w-full"
            {...register("comment")}
          />
          <div className="text-red-600 text-sm mt-2">
            <ErrorMessage name={"comment"} />
          </div>
        </Section>
        <Section>
          {evaluationIndex !== 10 && <Pagination step={evaluationIndex} />}
        </Section>
        <Section>
          <div className="flex place-content-end gap-3">
            <Button
              type="button"
              color="white"
              onClick={() =>
                setEvaluationIndex((prev) => (prev === 0 ? prev : prev - 1))
              }
            >
              Back
            </Button>
            <Button type="submit" color="teal">
              {evaluationIndex !== 10 ? "Continuă" : "Trimite"}
            </Button>
          </div>
        </Section>
      </form>
    </FormProvider>
  );
};

export default Evaluation;
