import Section from "@/components/Section";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { FinalDimensionModel } from "@/services/api/types";
import { useFormContext } from "react-hook-form";
import type { DimensionEvaluationForm } from ".";

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
  const stepDisplay = `(${stepIndex + 1} / ${totalSteps})`;
  const form = useFormContext<DimensionEvaluationForm>();

  return (
    <div className="space-y-6" key={`step-${stepIndex}`}>
      <h2 className="text-2xl font-semibold">
        {dimension.name} {stepDisplay}
      </h2>

      {dimension.quiz.map((question, index) => (
        <FormField
          key={question.id}
          control={form.control}
          name={`question_${index + 1}` as keyof DimensionEvaluationForm}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{question.question}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="0" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {question.option_1}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {question.option_2}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {question.option_3}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="3" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {question.option_4}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="4" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {question.option_5}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      <Section>
        <p className="text-base font-semibold leading-6 text-gray-900 mb-2">
          Te rugăm să argumentezi selecțiile făcute pentru indicatorul
          {dimension.name}
        </p>

        <FormField
          control={form.control}
          name={`comment`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Descriere <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Introdu descrierea programului"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Section>
    </div>
  );
}
