import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "@/redux/api/authApi";
import Section from "@/components/Section";
import { useAppDispatch } from "@/redux/store";
import { setToken } from "@/redux/features/userSlice";

const loginSchema = object({
  identifier: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [loginUser, { isLoading, isError, error, isSuccess, data }] =
    useLoginUserMutation();

  useEffect(() => {
    if (isSuccess && data?.jwt) {
      dispatch(setToken(data.jwt));
    }
  }, [isSuccess, data, dispatch]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <Section className="h-1/2 flex items-center justify-center mt-0 mr-auto mb-0 ml-auto flex-wrap container gap-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitHandler)}
          className="w-full h-full items- justify- pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0"
        >
          <p className="mb-2 leading-tight font-bold text-5xl font-heading text- text-black">
            Bine ai venit!
          </p>
          <p className="mb-2 text-lg text-gray-400 leading-relaxed text-">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sit
            eaque totam aliquid veritatis assumenda temporibus harum unde!
          </p>
          <div className="container mt-0 mr-auto mb-0 ml-auto pt-3 pr-4 pb-3">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 mr-0 mb-0 ml-0 rounded-md shadow-sm relative">
              <input
                placeholder="Introdu email"
                type="email"
                className="border focus:ring-teal-500 focus:border-teal-500
            w-full h-10 block border-gray-300 shadow-sm pt-0 pr-0 pb-0 pl-4 rounded-md sm:text-sm"
                {...methods.register("identifier")}
                required
              />
            </div>
          </div>
          <div className="container mt-0 mr-auto mb-0 ml-auto pt-3 pr-4 pb-3">
            <label className="block text-sm font-medium text-gray-700">
              Parola
            </label>
            <div className="mt-1 mr-0 mb-0 ml-0 rounded-md shadow-sm relative">
              <input
                placeholder="Introdu parola"
                type="password"
                className="border focus:ring-teal-500 focus:border-teal-500
            w-full h-10 block border-gray-300 shadow-sm pt-0 pr-0 pb-0 pl-4 rounded-md sm:text-sm"
                {...methods.register("password")}
                required
              />
            </div>
          </div>
          <div className="h- flex items-center justify-between mt-0 mr-auto mb-0 ml-auto flex-wrap container">
            <div className="h-full flex items-center justify-center pt-0 pr-4 pb-0  md:mb-0">
              <div className="inline-block pt-3 pr-4 pb-3 mt-0 mr-auto mb-0 container">
                <label className="block">
                  <input
                    placeholder="Text..."
                    type="checkbox"
                    className="border"
                  />
                  <span className="text-sm text-gray-700 ml-1">
                    Ține-mă conectat
                  </span>
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
          <button className="text-white rounded bg-teal-700 pt-2 pr-4 pb-2 pl-4 w-full">
            Intra in cont
          </button>
        </form>
      </FormProvider>
      <div className="w-full h-full flex items-center justify-center pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0">
        <iframe
          width="420"
          height="315"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
          className="object-contain object-top w-full"
        />
      </div>
    </Section>
  );
};
export default Login;
