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

const evaluationSchema = z.object({
  email: z
    .email("Adresa de email este invalidă")
    .min(1, "Vă rugăm introduceți adresa de email"),
});
export type EvaluationInput = z.infer<typeof evaluationSchema>;

const CreateEvaluation = ({ reportId }: { reportId: number }) => {
  const { mutate: createEvaluation } = useInviteNGOMemberMutation();

  const form = useForm<EvaluationInput>({
    resolver: zodResolver(evaluationSchema),
  });

  const onSubmitHandler = useCallback(
    ({ email }: EvaluationInput) => {
      createEvaluation(
        { report: reportId, email },
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
        {/* Detalii evaluare */}
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
        <Separator />
      </form>
    </Form>
  );
};

export default CreateEvaluation;
