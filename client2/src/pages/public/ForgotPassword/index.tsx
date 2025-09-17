import screenshot from "@/assets/illustration.svg";
import Section from "@/components/Section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "@/services/user.mutations";
import { useCallback } from "react";

const forgotPasswordSchema = z.object({
  email: z
    .email("Adresa de email este invalidă")
    .min(1, "Adresa de email este obligatorie"),
});
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { mutate: requestForgotPasswordEmail, isPending } =
    useForgotPasswordMutation();
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmitHandler = useCallback(
    ({ email }: ForgotPasswordForm) => {
      requestForgotPasswordEmail(email, {
        onSuccess: () => {
          navigate({ to: "/email-sent" });
        },
        onError: () => {
          toast.error("A aparut o problema");
        },
      });
    },
    [requestForgotPasswordEmail]
  );

  return (
    <Section>
      <div className="grid md:grid-cols-2 items-center justify-center mt-0 mr-auto mb-0 ml-auto gap-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-2 max-w-md"
          >
            <Heading level="h2">Resetare parola</Heading>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Introdu email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              Trimite parola noua
            </Button>
          </form>
        </Form>
        <div>
          <img src={screenshot} alt={"screenshot"} />
        </div>
      </div>
    </Section>
  );
};
export default ForgotPassword;
