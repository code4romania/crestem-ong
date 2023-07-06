import React, { useCallback, useEffect } from "react";
import Button from "@/components/Button";
import { useCreateEvaluationMutation } from "@/redux/api/userApi";
import { object, string, TypeOf } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { toast } from "react-toastify";
import { ErrorMessage } from "@hookform/error-message";

const evaluationSchema = object({
  email: string()
    .min(1, "Vă rugăm introduceți adresa de email")
    .email("Adresa de email este invalidă"),
});
export type EvaluationInput = TypeOf<typeof evaluationSchema>;

const CreateEvaluation = ({ reportId }: { reportId: string }) => {
  const [createEvaluation, { isSuccess, isError }] =
    useCreateEvaluationMutation();
  const { register, formState, handleSubmit, reset } = useForm<EvaluationInput>(
    {
      resolver: zodResolver(evaluationSchema),
    }
  );
  const onSubmitHandler = useCallback(
    ({ email }: EvaluationInput) => {
      createEvaluation({ id: reportId, email });
      reset();
    },
    [createEvaluation, reset]
  );
  useEffect(() => {
    if (isSuccess) {
      toast.success("Invitația a fost transmisă.");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Ceva nu a funcționat. Încearcă din nou.");
    }
  }, [isError]);

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
            type="email"
            autoComplete="family-name"
            className="inline-flex w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            {...register("email")}
          />{" "}
          <div className="text-red-600 text-sm">
            <ErrorMessage errors={formState.errors} name={"email"} />
          </div>
        </div>

        <Button type="submit">Invită</Button>
      </div>
    </form>
  );
};

export default CreateEvaluation;
