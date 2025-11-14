import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useInviteNGOMemberMutation } from "@/services/evaluation.mutations";
import { Separator } from "../ui/separator";
import type { FinalReportModel } from "@/services/api/types";

const CreateEvaluation = ({ report }: { report: FinalReportModel }) => {
  const { mutate: createEvaluation } = useInviteNGOMemberMutation();
  const evaluationSchema = z.object({
    email: z
      .email("Adresa de email este invalidă")
      .min(1, "Vă rugăm introduceți adresa de email")
      .refine((email) => !report.evaluations.some((e) => e.email === email), {
        message: "Adresa de email este deja invitată.",
      }),
  });

  type EvaluationInput = z.infer<typeof evaluationSchema>;

  const form = useForm<EvaluationInput>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmitHandler = useCallback(
    ({ email }: EvaluationInput) => {
      createEvaluation(
        { report: report.id, email },
        {
          onSuccess: () => toast.success("Invitația a fost transmisă."),
          onError: () => toast.error("Ceva nu a funcționat. Încearcă din nou."),
        }
      );
      form.reset();
    },
    [createEvaluation, form, form.reset]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invită membrii organizației</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Invită</Button>
      </form>
    </Form>
  );
};

export default CreateEvaluation;
