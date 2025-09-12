import React, { useCallback } from "react";
import screenshot from "@/assets/illustration.svg";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import Section from "@/components/Section";
import { useForgotPasswordMutation } from "@/redux/api/authApi";

const forgotPasswordSchema = object({
  email: string()
    .min(1, "Adresa de email este obligatorie")
    .email("Adresa de email este invalidă"),
});
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [sendForgotPasswordRequest] = useForgotPasswordMutation();
  const { register, handleSubmit, reset, formState } =
    useForm<ForgotPasswordInput>({
      resolver: zodResolver(forgotPasswordSchema),
    });

  const onSubmitHandler = useCallback(
    ({ email }: ForgotPasswordInput) => {
      console.log("send password");
      sendForgotPasswordRequest({ email });
      reset();
    },
    [reset]
  );

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
          {/*<p className="mb-2 text-lg text-gray-400 leading-relaxed text-">*/}
          {/*  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sit eaque*/}
          {/*  totam aliquid veritatis assumenda temporibus harum unde!*/}
          {/*</p>*/}
          <div className="container mt-0 mb-4 mr-auto mb-0 ml-auto pt-3 pr-4 pb-3">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 mr-0 mb-0 ml-0 rounded-md shadow-sm relative">
              <input
                placeholder="Introdu email"
                type="email"
                className="border focus:ring-teal-500 focus:border-teal-500
            w-full h-10 block border-gray-300 shadow-sm pt-0 pr-0 pb-0 pl-4 rounded-md sm:text-sm"
                {...register("email")}
              />
              <div className="text-red-600 text-sm mt-1">
                <ErrorMessage name="email" errors={formState.errors} />
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
export default ForgotPassword;
