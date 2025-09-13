import screenshot from "@/assets/illustration.svg";
import { PasswordInput } from "@/components/ui/password-input";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Route } from "@/routes/(auth)/reset-password";
import { useResetPasswordMutation } from "@/services/user.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Parola este obligatorie")
      .min(8, "Parola trebuie sa contina cel putin 8 caractere")
      .max(32, "Parola trebuie sa contina cel mult 32 caractere")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Parola trebuie sa contina cel putin o litera mica, o litera mare si o cifra"
      ),
    passwordConfirmation: z
      .string()
      .min(1, "Confirmarea parolei este obligatorie"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Parolele nu coincid",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const navigate = Route.useNavigate();
  const { code } = Route.useSearch();

  const { mutate: resetPassword, isPending } = useResetPasswordMutation();
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmitHandler = useCallback(
    (values: ResetPasswordForm) => {
      console.log("ji");
      resetPassword(
        {
          password: values.password,
          passwordConfirmation: values.passwordConfirmation,
          code,
        },
        {
          onSuccess: () => {
            toast.success("Parola a fost schimbata cu succes");
            navigate({ to: "/login" });
          },
          onError: () => {
            toast.error("A aparut o problema");
          },
        }
      );
      form.reset();
    },
    [resetPassword, form, code]
  );

  // const onSubmitHandler = useCallback(
  //   ({ password, passwordConfirmation }: ResetPasswordInput) => {
  //     if (code) {
  //       sendResetPasswordRequest({ password, passwordConfirmation, code });
  //       reset();
  //     }
  //   },
  //   [sendResetPasswordRequest, reset]
  // );

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Parola a fost schimbata cu succes");
  //     navigate("/login");
  //   }
  // }, [isSuccess, navigate]);

  // useEffect(() => {
  //   if (isError) {
  //     toast.error("A aparut o problema");
  //   }
  // }, [isError]);

  // useEffect(() => {
  //   if (!code) {
  //     navigate("/");
  //   }
  // }, [code, navigate]);

  return (
    <Section>
      <div className="flex items-center justify-center mt-0 mr-auto mb-0 ml-auto flex-wrap container">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-6 w-full h-full items- justify- pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola noua</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Introdu parola" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeta parola</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Repeta parola" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Se proceseaza..." : "Trimite parola noua"}
            </Button>
          </form>
        </Form>
        <div className="w-full h-full flex items-center justify-center pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0">
          <img src={screenshot} />
        </div>
      </div>
    </Section>
  );
};
export default ResetPassword;
