import { QuizQuestion } from "@/redux/api/types";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { EvaluationForm } from ".";

interface RadioQuestionProps {
  stepIndex: number;
  questionIndex: number;
  question: QuizQuestion;
}

export function RadioQuestion({
  stepIndex,
  question,
  questionIndex,
}: RadioQuestionProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<EvaluationForm>();

  return (
    <div className="mt-4">
      <label className="text-base font-semibold leading-6 text-gray-900">
        {question.question}
      </label>
      <fieldset className="mt-4">
        <div className="space-y-4">
          {[0, 1, 2, 3, 4].map((index) => (
            <div className="flex items-center" key={index}>
              <input
                id={`${questionIndex}-option_${index + 1}`}
                type="radio"
                className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
                value={index}
                {...register(
                  `dimensions.${stepIndex}.question_${
                    questionIndex + 1
                  }` as keyof EvaluationForm
                )}
              />
              <label
                htmlFor={`${questionIndex}-option_${index + 1}`}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {question[`option_${index + 1}` as keyof QuizQuestion]}
              </label>
            </div>
          ))}
          <div className="text-red-600 text-sm">
            <ErrorMessage
              name={
                `dimensions.${stepIndex}.question_${
                  questionIndex + 1
                }` as keyof EvaluationForm
              }
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}
