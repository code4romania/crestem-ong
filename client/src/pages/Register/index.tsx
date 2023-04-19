import React, { useEffect } from "react";
import { useRegisterUserMutation } from "@/redux/api/authApi";
import { custom, literal, object, string, TypeOf } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { setToken } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import SocialNetworkLinks from "@/pages/Register/SocialNetworkLinks";
import { useUploadMutation } from "@/redux/api/userApi";

const registerSchema = object({
  ongName: string().min(1, "Numele organizatiei este obligatoriu"),
  ongIdentificationNumber: string().min(
    1,
    "Numarul de identifiare este obligatoriu"
  ),
  county: string().min(1, "Judetul este obligatoriu"),
  city: string().min(1, "Orasul este obligatoriu"),
  email: string()
    .min(1, "Adresa de email este obligatorie")
    .email("Email Address is invalid"),
  phone: string().min(1, "Telefonul este obligatoriu"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string(),
  avatar: custom<File[]>(),
  activities: string(),
  website: string(),
  keywords: string(),
  description: string(),
  contactFirstName: string(),
  contactLastName: string(),
  contactEmail: string()
    .email("Adresa de email este invalida")
    .optional()
    .or(literal("")),
  contactPhone: string(),
  accountFacebook: string().optional(),
  accountTwitter: string().optional(),
  accountTiktok: string().optional(),
  accountInstagram: string().optional(),
  accountLinkedin: string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match",
  path: ["confirmpassword"],
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const Register = () => {
  const [submitRegister, { isSuccess, isError, error, data }] =
    useRegisterUserMutation();
  const [
    uploadAvatar,
    { isError: isUploadAvatarError, error: uploadAvatarError },
  ] = useUploadMutation();
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const avatar = methods.watch("avatar");
  const hasAvatar = !!avatar;
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error?.data?.error?.message) {
      toast.error(error.data.error.message);
    }
  }, [error?.data?.error?.message]);

  useEffect(() => {
    const message = uploadAvatarError?.data?.error?.message;
    if (isUploadAvatarError && message) {
      toast.error(message);
    }
  }, [isUploadAvatarError, uploadAvatarError?.data?.error?.message]);

  useEffect(() => {
    if (isSuccess && data?.jwt) {
      dispatch(setToken(data.jwt));
    }
  }, [isSuccess, data?.jwt, dispatch]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    const formData = new FormData();
    const res = await submitRegister({ ...values, username: values.email });
    if (values.avatar[0].name) {
      formData.append(`files`, values.avatar[0], values.avatar[0].name);
      formData.append(`ref`, "plugin::users-permissions.user");
      formData.append(`refId`, res.data.user.id);
      formData.append(`field`, "avatar");
      uploadAvatar(formData);
    }
  };

  return (
    <div>
      <Section>
        <div className={"space-y-2"}>
          <Heading level={"h2"}>Înregistrare</Heading>
        </div>
      </Section>
      <Section>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmitHandler)}
            className="space-y-8 divide-y divide-gray-200 max-w-3xl mx-auto"
          >
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Informații obligatorii despre ONG
                  </h3>
                  {/*<p className="mt-1 text-sm text-gray-500">*/}
                  {/*  This information will be displayed publicly so be careful what*/}
                  {/*  you share.*/}
                  {/*</p>*/}
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="ong_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nume organizatie
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("ongName")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="ong_identification_number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CIF-ul organizației
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("ongIdentificationNumber")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Judet
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("county")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Localitate
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("city")}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email organizație
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("email")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Telefon organizație
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("phone")}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Parola
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("password")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirma parola
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("confirmPassword")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Informații adiționale despre ONG (opționale)
                  </h3>
                  {/*<p className="mt-1 text-sm text-gray-500">*/}
                  {/*  Use a permanent address where you can receive mail.*/}
                  {/*</p>*/}
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Domenii activitate
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("activities")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Website organizație
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("website")}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cuvinte cheie despre activitate
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("keywords")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="avatar" className="">
                      <div className="text-sm font-medium text-gray-700 mb-2.5">
                        Logo organizație
                      </div>
                      <div className="flex items-center gap-10 cursor-pointer">
                        {!!avatar?.length ? (
                          <img
                            className="h-12 w-12 overflow-hidden rounded-full bg-gray-100"
                            src={URL.createObjectURL(avatar[0])}
                            alt={avatar[0].name}
                            style={{ width: "100px", height: "100px" }}
                          />
                        ) : (
                          <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                        )}
                        <div className={"pointer-events-none"}>
                          <Button color={"white"} type="button">
                            {!hasAvatar ? "Încarcă logo" : "Schimbă logo"}
                          </Button>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          id={"avatar"}
                          {...methods.register("avatar")}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descrie activitatea organizației
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={3}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("description")}
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Numarul maxim de caractere: 1000
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Comunicare și social media
                  </h3>
                  {/*<p className="mt-1 text-sm text-gray-500">*/}
                  {/*  We'll always let you know about important changes, but you*/}
                  {/*  pick what else you want to hear about.*/}
                  {/*</p>*/}
                </div>
                <div className={"mt-4"}>Link-uri către social media</div>
                <SocialNetworkLinks />
                <div className={"mt-4"}>Persoană de contact organizație</div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nume
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("contactLastName")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prenume
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("contactFirstName")}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Adresă de email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("contactEmail")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Telefon
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("contactPhone")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end gap-4">
                <Button to="/" color="white">
                  Renunță
                </Button>
                <Button type="submit">Salvează</Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </Section>
    </div>
  );
};
export default Register;
