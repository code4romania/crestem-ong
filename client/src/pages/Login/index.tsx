import React, { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "@/redux/api/authApi";
import Section from "@/components/Section";
import { useAppDispatch } from "@/redux/store";
import { setToken } from "@/redux/features/userSlice";
import { toast } from "react-toastify";
import Heading from "@/components/Heading";
import screenshot from "@/assets/screenshot-start.jpg";
import Button from "@/components/Button";
import Cookies from "js-cookie";

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

const Input = ({ register, name, label, errors, ...rest }) => (
  <div className="container mt-0 mr-auto mb-0 ml-auto pt-2 pr-4 pb-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1 mr-0 mb-0 ml-0 rounded-md shadow-sm relative">
      <input
        className="border focus:ring-teal-500 focus:border-teal-500
            w-full h-10 block border-gray-300 shadow-sm pt-0 pr-0 pb-0 pl-4 rounded-md sm:text-sm"
        {...register(name)}
        {...rest}
      />
      {errors && (
        <div className="text-red-400 text-sm py-2">
          <ErrorMessage errors={errors} name={name} />
        </div>
      )}
    </div>
  </div>
);

const Login = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

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
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, error?.data?.error?.message]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <Section>
      <div className="grid md:grid-cols-2 items-center justify-center mt-0 mr-auto mb-0 ml-auto gap-8">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormHeader />
          <Input
            label="Email"
            placeholder="Introdu email"
            name="identifier"
            type="email"
            register={register}
            errors={errors}
            required
          />
          <Input
            label="Parola"
            placeholder="Introdu parola"
            name="password"
            type="password"
            register={register}
            errors={errors}
            required
          />
          <FormFooter />
          <Button>Intra in cont</Button>
        </form>
        <div>
          <img src={screenshot} alt={"screenshot"} />
        </div>
      </div>
    </Section>
  );
});

export default Login;
