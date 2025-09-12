import React, { useEffect } from "react";
import { z } from "zod";
import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { setToken } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import SocialNetworkLinks from "@/components/SocialNetworkLinks";
import {
  useCreateUserMutation,
  useGetDomainsQuery,
  useUploadMutation,
} from "@/redux/api/userApi";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import MultiSelect from "@/components/MultiSelect";
import { ErrorMessage } from "@hookform/error-message";
import Avatar from "@/components/Avatar";

const registerSchema = z
  .object({
    ongName: z.string().min(1, "Numele organizatiei este obligatoriu"),
    ongIdentificationNumber: z
      .string()
      .min(1, "Numarul de identifiare este obligatoriu"),
    county: z.string().min(1, "Judetul este obligatoriu"),
    city: z.string().min(1, "Orasul este obligatoriu"),
    email: z
      .email("Adresa de email este invalidă")
      .min(1, "Adresa de email este obligatorie"),
    phone: z.string().min(1, "Telefonul este obligatoriu"),
    avatar: z.custom<File[]>(),
    domains: z.array(z.number()),
    website: z.string(),
    keywords: z.string(),
    description: z.string(),
    contactFirstName: z.string(),
    contactLastName: z.string(),
    contactEmail: z
      .email("Adresa de email este invalida")
      .optional()
      .or(z.literal("")),
    contactPhone: z.string(),
    accountFacebook: z.string().optional(),
    accountTwitter: z.string().optional(),
    accountTiktok: z.string().optional(),
    accountInstagram: z.string().optional(),
    accountLinkedin: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Ne pare rau, parola nu coincide",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

const CreateUser = () => {
  const [submitRegister, { isSuccess, isError, error, data }] =
    useCreateUserMutation();
  const [
    uploadAvatar,
    { isError: isUploadAvatarError, error: uploadAvatarError },
  ] = useUploadMutation();
  const { data: domains } = useGetDomainsQuery(null);
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const avatar = methods.watch("avatar");
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
    if (values.avatar?.length && values.avatar[0]?.name) {
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
          <Heading level={"h2"}>Adaugă organizație</Heading>
        </div>
      </Section>
      <Section>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmitHandler)}
            className="space-y-8 divide-y divide-gray-200 mx-auto"
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
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("county")}
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
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("city")}
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
                          <Avatar
                            src={""}
                            alt={"Logo"}
                            width={100}
                            height={100}
                          />
                        )}
                        <div className={"pointer-events-none"}>
                          <Button color={"white"} type="button">
                            {!hasAvatar ? "Încarcă logo" : "Alege fisier"}
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
export default CreateUser;
