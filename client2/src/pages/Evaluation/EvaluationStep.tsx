// import { RadioQuestion } from "@/components/radio-question";
import Section from "@/components/Section";
import type { FinalDimensionModel } from "@/services/api/types";
import { ErrorMessage } from "@hookform/error-message";
import { Controller, useFormContext } from "react-hook-form";
import { RadioQuestion } from "./RadioQuestion";

interface FormStepProps {
  dimension: FinalDimensionModel;
  stepIndex: number;
  totalSteps: number;
}

export function EvaluationStep({
  dimension,
  stepIndex,
  totalSteps,
}: FormStepProps) {
  const { control } = useFormContext<EvaluationForm>();

  const stepDisplay = `(${stepIndex + 1} / ${totalSteps})`;

  return (
    <div className="space-y-6" key={`step-${stepIndex}`}>
      <h2 className="text-2xl font-semibold">
        {dimension.name} {stepDisplay}
      </h2>

      {dimension.quiz.map((question, index) => (
        <RadioQuestion
          key={question.id}
          stepIndex={stepIndex}
          questionIndex={index}
          question={question}
        />
      ))}

      <Section>
        <p className="text-base font-semibold leading-6 text-gray-900 mb-2">
          Te rugăm să argumentezi selecțiile făcute pentru indicatorul{" "}
          {dimension.name}
        </p>

        <Controller
          name={`dimensions.${stepIndex}.comment`}
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <textarea
                className="rounded-md border-gray-300 w-full"
                onChange={field.onChange}
                value={field.value}
              ></textarea>

              <div className="text-red-600 text-sm mt-2">
                <ErrorMessage name={`dimensions.${stepIndex}.comment`} />
              </div>
            </div>
          )}
        />
      </Section>
    </div>
  );
}
