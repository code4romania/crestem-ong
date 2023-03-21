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
      <label>Adaugă email</label>
      <input {...register("email")} /> <Button type="submit">Invită</Button>
    </form>
  );
};

export default CreateEvaluation;
