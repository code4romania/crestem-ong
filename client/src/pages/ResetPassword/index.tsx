import React, { useCallback, useEffect } from "react";
import screenshot from "@/assets/illustration.svg";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { ErrorMessage } from "@hookform/error-message";
import Section from "@/components/Section";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const resetPasswordSchema = object({
  password: string()
    .min(1, "Parola este obligatorie")
    .min(8, "Parola trebuie sa contina cel putin 8 caractere")
    .max(32, "Parola trebuie sa contina cel mult 32 caractere"),
  passwordConfirmation: string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Parola nu coincide",
  path: ["passwordConfirmation"],
});
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema> & {
  code: string;
};

const ResetPassword = () => {
  const [sendResetPasswordRequest, { isSuccess, isError }] =
    useResetPasswordMutation();
  const { register, handleSubmit, reset, formState } =
    useForm<ResetPasswordInput>({
      resolver: zodResolver(resetPasswordSchema),
    });
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const onSubmitHandler = useCallback(
    ({ password, passwordConfirmation }: ResetPasswordInput) => {
      if (code) {
        sendResetPasswordRequest({ password, passwordConfirmation, code });
        reset();
      }
    },
    [sendResetPasswordRequest, reset]
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Parola a fost schimbata cu succes");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error("A aparut o problema");
    }
  }, [isError]);

  useEffect(() => {
    if (!code) {
      navigate("/");
    }
  }, [code, navigate]);

  return (
    <Section>
      <div className="flex items-center justify-center mt-0 mr-auto mb-0 ml-auto flex-wrap container">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="w-full h-full items- justify- pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0"
        >
          <p className="mb-2 leading-tight font-bold text-5xl font-heading text- text-black">
            Resetare parola
          </p>
          <div className="container mt-0 mb-4 mr-auto mb-0 ml-auto pt-3 pr-4 pb-3">
            <label className="block text-sm font-medium text-gray-700">
              Parola noua
            </label>
            <div className="mt-1 mr-0 mb-0 ml-0 rounded-md shadow-sm relative">
              <input
                placeholder="Introdu parola"
                type="password"
                className="border focus:ring-teal-500 focus:border-teal-500
            w-full h-10 block border-gray-300 shadow-sm pt-0 pr-0 pb-0 pl-4 rounded-md sm:text-sm"
                {...register("password")}
              />
              <div className="text-red-600 text-sm mt-1">
                <ErrorMessage name="password" errors={formState.errors} />
              </div>
            </div>

            <div className="container mt-0 mb-4 mr-auto mb-0 ml-auto pt-3 pr-4 pb-3">
              <label className="block text-sm font-medium text-gray-700">
                Repeta parola
              </label>
              <div className="mt-1 mr-0 mb-0 ml-0 rounded-md shadow-sm relative">
                <input
                  placeholder="Repeta parola"
                  type="password"
                  className="border focus:ring-teal-500 focus:border-teal-500
            w-full h-10 block border-gray-300 shadow-sm pt-0 pr-0 pb-0 pl-4 rounded-md sm:text-sm"
                  {...register("passwordConfirmation")}
                />
                <div className="text-red-600 text-sm mt-1">
                  <ErrorMessage
                    name="passwordConfirmation"
                    errors={formState.errors}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button>Trimite parola noua</Button>
        </form>
        <div className="w-full h-full flex items-center justify-center pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0">
          <img src={screenshot} />
        </div>
      </div>
    </Section>
  );
};
export default ResetPassword;
