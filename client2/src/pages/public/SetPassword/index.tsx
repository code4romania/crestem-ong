import React, { useCallback, useEffect } from "react";
import screenshot from "@/assets/illustration.svg";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import Section from "@/components/Section";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetRegistrationInfoQuery,
  useRegisterWithConfirmationTokenMutation,
} from "@/redux/api/userApi";
import { setToken } from "@/redux/features/userSlice";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/store";

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
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const registrationToken = searchParams.get("registrationToken");

  const { data: user } = useGetRegistrationInfoQuery({ registrationToken });

  const [sendRegisterRequest, { isSuccess, isError }] =
    useRegisterWithConfirmationTokenMutation();
  const [loginUser, { data }] = useLoginUserMutation();

  const { register, handleSubmit, reset, formState } =
    useForm<ResetPasswordInput>({
      resolver: zodResolver(resetPasswordSchema),
    });
  const navigate = useNavigate();

  const onSubmitHandler = useCallback(
    async ({ password, passwordConfirmation }: ResetPasswordInput) => {
      if (password) {
        const res = await sendRegisterRequest({
          ...user,
          password,
          passwordConfirmation,
        });
        loginUser({ identifier: user.email, password });
        reset();
      }
    },
    [sendRegisterRequest, reset, user]
  );

  useEffect(() => {
    if (isSuccess && data?.jwt) {
      dispatch(setToken(data.jwt));
      Cookies.set("jwt", data.jwt);
      navigate("/");
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error("A aparut o problema");
    }
  }, [isError]);

  useEffect(() => {
    if (!registrationToken) {
      navigate("/");
    }
  }, [registrationToken, navigate]);

  return (
    <Section>
      <div className="flex items-center justify-center mt-0 mr-auto mb-0 ml-auto flex-wrap container">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="w-full h-full items- justify- pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0"
        >
          <p className="mb-2 leading-tight font-bold text-5xl font-heading text- text-black">
            Bine ai venit,
            <br />
            <span className={"text-green-700"}>{user?.ongName}!</span>
          </p>
          <div className="container mt-4 mr-auto mb-0 ml-auto pt-3 pr-4 pb-2">
            <label className="block text-sm font-medium text-gray-700">
              Parola
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
                Confirmă parola
              </label>
              <div className="mt-1 mr-0 mb-0 ml-0 rounded-md shadow-sm relative">
                <input
                  placeholder="Confirmă parola"
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
          <Button>Intră în cont</Button>
        </form>
        <div className="w-full h-full flex items-center justify-center pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0">
          <img src={screenshot} />
        </div>
      </div>
    </Section>
  );
};
export default ResetPassword;
