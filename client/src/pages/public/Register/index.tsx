import React, { useEffect, useMemo } from "react";
import { useRegisterUserMutation } from "@/redux/api/authApi";
import { array, custom, literal, number, object, string, TypeOf } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { setToken } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import SocialNetworkLinks from "@/pages/public/Register/SocialNetworkLinks";
import { useGetDomainsQuery, useUploadMutation } from "@/redux/api/userApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import MultiSelect from "@/components/MultiSelect";
import { ErrorMessage } from "@hookform/error-message";
import citiesByCounty from "@/lib/orase-dupa-judet.json";
import Select from "@/components/Select";

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
  domains: array(number()).optional(),
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
  message: "Ne pare rau, parola nu coincide",
  path: ["confirmPassword"],
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const Register = () => {
  const [submitRegister, { isSuccess, isError, error, data }] =
    useRegisterUserMutation();
  const [
    uploadAvatar,
    { isError: isUploadAvatarError, error: uploadAvatarError },
  ] = useUploadMutation();
  const { data: domains } = useGetDomainsQuery(null);
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const avatar = methods.watch("avatar");
  const county = methods.watch("county");

  const hasAvatar = !!avatar;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.data?.error?.message) {
      if (
        error?.data?.error?.details?.errors?.length > 0 &&
        error?.data.error.details.errors.find(({ path }) =>
          path.includes("ongIdentificationNumber")
        )
      ) {
        toast.error("Organizație deja înregistrată în platformă");
      } else {
        toast.error(error.data.error.message);
      }
    }
  }, [error?.data?.error?.message, error?.data?.error?.details?.errors]);

  useEffect(() => {
    const message = uploadAvatarError?.data?.error?.message;
    if (isUploadAvatarError && message) {
      toast.error(message);
    }
  }, [isUploadAvatarError, uploadAvatarError?.data?.error?.message]);

  useEffect(() => {
    if (isSuccess && data?.jwt) {
      dispatch(setToken(data.jwt));
      Cookies.set("jwt", data.jwt);
      navigate("/");
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

  const counties = Object.keys(citiesByCounty).sort().map((county: string) => ({
    label: county,
    name: county,
  }));

  const cities = useMemo(
    () =>
      county
        ? [...new Set(citiesByCounty[county].map((city) => city.nume))].sort().map(
            (city) => ({
              name: city,
              label: city,
            })
          )
        : [],
    [citiesByCounty, county]
  );

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
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="ong_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Numele organizației
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("ongName")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"ongName"} />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="ong_identification_number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CIF-ul organizației
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("ongIdentificationNumber")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"ongIdentificationNumber"} />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Județ
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <Select
                        options={counties}
                        register={methods.register}
                        name="county"
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"county"} />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Localitate
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <Select
                        options={cities}
                        register={methods.register}
                        name="city"
                        defaultValue={cities[0]?.name}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"city"} />
                      </div>
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
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("email")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"email"} />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Telefon organizație
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("phone")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"phone"} />
                      </div>
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
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("password")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"password"} />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirmă parola
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("confirmPassword")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"confirmPassword"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Informații adiționale despre ONG (opționale)
                  </h3>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {domains?.length > 0 && (
                    <div className="sm:col-span-3">
                      <MultiSelect
                        options={domains}
                        label={"Domenii activitate"}
                        {...methods.register("domains")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"domains"} />
                      </div>
                    </div>
                  )}

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
                      Numărul maxim de caractere: 1000
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Comunicare și social media
                  </h3>
                </div>
                <div className={"mt-4"}>Link-uri către social media</div>
                <SocialNetworkLinks />
                <div className={"mt-4"}>Persoana de contact a organizației</div>
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
