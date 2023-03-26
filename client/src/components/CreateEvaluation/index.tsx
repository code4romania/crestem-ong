import React, { useCallback } from "react";
import Button from "@/components/Button";
import { useCreateEvaluationMutation } from "@/redux/api/userApi";
import { object, string, TypeOf } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";

const evaluationSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
});
export type EvaluationInput = TypeOf<typeof evaluationSchema>;

const CreateEvaluation = ({ reportId }: { reportId: string }) => {
  const [createEvaluation] = useCreateEvaluationMutation();
  const { register, handleSubmit, reset } = useForm<EvaluationInput>({
    resolver: zodResolver(evaluationSchema),
  });
  const onSubmitHandler = useCallback(
    ({ email }: EvaluationInput) => {
      createEvaluation({ id: reportId, email });
      reset();
    },
    [createEvaluation, reset]
  );

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="sm:col-span-6">
        <label
          htmlFor="last-name"
          className="block text-sm font-medium text-gray-700"
        >
          Invită membrii organizației
        </label>
        <div className="my-2">
          <input
            type="text"
            autoComplete="family-name"
            className="inline-flex w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            {...register("email")}
          />
        </div>
        <Button type="submit">Invită</Button>
      </div>
    </form>
  );
};

export default CreateEvaluation;
