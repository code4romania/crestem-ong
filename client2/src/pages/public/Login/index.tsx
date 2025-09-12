import screenshot from "@/assets/illustration.svg";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { setToken } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/store";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { memo, useEffect } from "react";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
  type Path,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

const loginSchema = z.object({
  identifier: z
    .email("Adresa de email este invalidă")
    .min(1, "Adresa de email este obligatorie"),
  password: z
    .string()
    .min(1, "Parola este obligatorie")
    .min(8, "Parola trebuie sa contina cel putin 8 caractere")
    .max(32, "Parola trebuie sa contina cel mult 32 caractere"),
});

export type LoginInput = z.infer<typeof loginSchema>;

const FormHeader = memo(() => (
  <>
    <Heading level="h2">Bine ai venit!</Heading>
    {/*<p className="my-2 text-lg text-gray-400 leading-relaxed text-">*/}
    {/*  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sit eaque*/}
    {/*  totam aliquid veritatis assumenda temporibus harum unde!*/}
    {/*</p>*/}
  </>
));

const FormFooter = memo(() => (
  <div className="flex items-center justify-between mt-0 mr-auto mb-0 ml-auto flex-wrap container">
    <div className="h-full flex items-center justify-center pt-0 pr-4 pb-0  md:mb-0">
      <div className="inline-block pt-3 pr-4 pb-3 mt-0 mr-auto mb-0 container">
        <label className="block">
          <input placeholder="Text..." type="checkbox" className="border" />
          <span className="text-sm text-gray-700 ml-1">Ține-mă conectat</span>
        </label>
      </div>
    </div>
    <div className="h-full flex items-center justify-center pt-0 pr-4 pb-0 pl-4 md:mb-0">
      <div className="container mt-0 mr-auto mb-0 ml-auto text-center">
        <Link
          to={"/forgot-password"}
          className="text-sm leading-5 font-medium text-teal-600"
        >
          Ai uitat parola?
        </Link>
      </div>
    </div>
  </div>
));

const Login = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const [loginUser, { isLoading, isError, error, isSuccess, data }] =
    useLoginUserMutation();

  useEffect(() => {
    if (isSuccess && data?.jwt) {
      dispatch(setToken(data.jwt));
      Cookies.set("jwt", data.jwt);
      navigate("/");
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    const message = error?.data?.error?.message;
    if (isError) {
      if (message) {
        toast.error(
          "Credențialele introduse nu sunt corecte. Vă rugăm să verificați și să încercați din nou."
        );
      } else {
        toast.error(
          "Ne pare rău, dar serverul este momentan indisponibil. Vă rugăm să încercați din nou mai târziu."
        );
      }
    }
  }, [isError, error?.data?.error?.message]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <Section>
      <div className="grid md:grid-cols-2 items-center justify-center mt-0 mr-auto mb-0 ml-auto gap-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="space-y-8"
          >
            <FormHeader />

            <FormField
              control={form.control}
              name="identifier"
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Introdu parola" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormFooter />
            <Button type="submit">Intra in cont</Button>
          </form>
        </Form>
        <div>
          <img src={screenshot} alt={"screenshot"} />
        </div>
      </div>
    </Section>
  );
});

export default Login;
