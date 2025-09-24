import screenshot from "@/assets/illustration.svg";
import { Button } from "@/components/ui/button";
import Section from "@/components/Section";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { Route } from "@/routes/(auth)/confirm-email";
import { useConfirmAccount } from "@/services/user.mutations";
import { useGetRegistrationInfo } from "@/services/user.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Parola este obligatorie")
      .min(8, "Parola trebuie sa contina cel putin 8 caractere")
      .max(32, "Parola trebuie sa contina cel mult 32 caractere"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Parola nu coincide",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

const ConfirmEmail = () => {
  const { registrationToken } = Route.useSearch();
  const { data: user } = useGetRegistrationInfo(registrationToken);

  const { mutateAsync: confirmAccount, isPending } = useConfirmAccount();

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });
  const navigate = Route.useNavigate();

  useEffect(() => {
    if (!registrationToken) {
      navigate({ to: "/" });
    }
  }, [registrationToken, navigate]);

  async function onSubmitHandler({
    password,
    passwordConfirmation,
  }: ResetPasswordInput) {
    await confirmAccount(
      {
        ...user,
        password,
        passwordConfirmation,
        registrationToken,
      },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
        onError: () => {
          toast.error("A aparut o problema");
        },
      }
    );
  }

  return (
    <Section>
      <div className="grid md:grid-cols-2 items-center justify-center mt-0 mr-auto mb-0 ml-auto gap-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-2 max-w-md"
          >
            <p className="mb-2 leading-tight font-bold text-5xl font-heading text- text-black">
              Bine ai venit,
              <br />
              <span className={"text-green-700"}>{user?.ongName}!</span>
            </p>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Parola" {...field} />
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
                  <FormLabel>Confirmă parola</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Confirmă parola" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Intră în cont
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
export default ConfirmEmail;
