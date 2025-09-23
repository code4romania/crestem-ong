import React, { useEffect } from "react";
import { z } from "zod";
import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { toast } from "sonner";
import {
  useGetDimensionsQuery,
  useGetProgramsQuery,
  useUpdateUserMutation,
  useUploadMutation,
} from "@/redux/api/userApi";
import { useNavigate } from "@tanstack/react-router";
import MultiSelect from "@/components/MultiSelect";
import { ErrorMessage } from "@hookform/error-message";
import Toggle from "@/components/Toggle";
import Select from "@/components/Select";
import Avatar from "@/components/Avatar";

const mentorProfileSchema = z.object({
  firstName: z.string().min(1, "Nume este obligatoriu"),
  lastName: z.string().min(1, "Prenume este obligatoriu"),
  email: z
    .email("Adresa de email este invalidă")
    .min(1, "Adresa de email este obligatorie"),
  bio: z.string().min(1, "Adaugati o scurta descriere"),
  expertise: z.string().nullish(),
  dimensions: z.array(z.number()).min(1, "Selectează cel puțin o specializare"),
  program: z.string(),
  available: z.boolean(),
  avatar: z.custom<File[]>(),
});

export type MentorProfileInput = z.infer<typeof mentorProfileSchema>;

const EditProfile = () => {
  const { data: user } = useGetMe();
  const [updateMentorProfile, { isSuccess, isError, error, data }] =
    useUpdateUserMutation();
  const { data: programs, isLoading: isLoadingPrograms } =
    useGetProgramsQuery(null);
  const { data: dimensions, isLoading: isLoadingDimensions } =
    useGetDimensionsQuery(null);

  const [
    uploadAvatar,
    { isError: isUploadAvatarError, error: uploadAvatarError },
  ] = useUploadMutation();

  const methods = useForm<MentorProfileInput>({
    resolver: zodResolver(mentorProfileSchema),
    defaultValues: {
      ...user,
      available: user.available || false,
      program: user.program.id.toz.String(),
      dimensions: user.dimensions.map(({ id }) => id),
      bio: user?.bio || "",
    },
  });

  const avatar = methods.watch("avatar");
  const hasAvatar = !!avatar;

  const navigate = useNavigate();

  useEffect(() => {
    if (error?.data?.error?.message) {
      toast.error(error.data.error.message);
    }
  }, [error?.data?.error?.message]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile");
    }
  }, [isSuccess]);

  useEffect(() => {
    const message = uploadAvatarError?.data?.error?.message;
    if (isUploadAvatarError && message) {
      toast.error(message);
    }
  }, [isUploadAvatarError, uploadAvatarError?.data?.error?.message]);

  const onSubmitHandler: SubmitHandler<MentorProfileInput> = async (data) => {
    updateMentorProfile({
      id: user?.id,
      ...data,
    });

    if (data.avatar?.length && data.avatar[0]?.name) {
      const formData = new FormData();

      formData.append(`files`, data.avatar[0], data.avatar[0].name);
      formData.append(`ref`, "plugin::users-permissions.user");
      formData.append(`refId`, user?.id?.toz.String() || "");
      formData.append(`field`, "avatar");
      uploadAvatar(formData);
    }
  };

  return (
    <div>
      <Section>
        <div className={"space-y-2"}>
          <Heading level={"h2"}>Editeaza profilul</Heading>
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
                    Informații generale
                  </h3>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nume persoană resursă
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("firstName")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"firstName"} />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="ong_identification_number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prenume persoană resursă
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("lastName")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"lastName"} />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email persoană resursă
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("email")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"email"} />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <MultiSelect
                      defaultValues={user.dimensions.map(({ name, id }) => ({
                        id: id,
                        name: name,
                      }))}
                      options={
                        dimensions
                          ? dimensions?.map((dimension) => ({
                              id: dimension.id,
                              name: dimension.name,
                            }))
                          : []
                      }
                      label={"Specializare pe dimensiuni"}
                      isMandatory={true}
                      {...methods.register("dimensions")}
                    />
                    <div className="text-red-400 text-sm py-2">
                      <ErrorMessage name={"dimensions"} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <Select
                      defaultValue={user.program.id}
                      label={"Program asociat"}
                      name={"program"}
                      options={
                        programs?.map((program) => ({
                          label: program.name,
                          name: program.id,
                        })) || []
                      }
                      register={methods.register}
                    />
                  </div>
                  <div className="text-red-400 text-sm py-2">
                    <ErrorMessage name={"program"} />
                  </div>
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Disponibilitate
                    </label>
                    <div className="mt-2">
                      <Toggle
                        name="available"
                        enabled={methods.watch("available")}
                        onChange={methods.setValue}
                      />
                    </div>
                    <div className="text-red-400 text-sm py-2">
                      <ErrorMessage name={"available"} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descriere (bio)
                      <span className="text-red-700 ml-1.5">*</span>
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={3}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("bio")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"bio"} />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Arii de expertiză
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={3}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("expertise")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"expertise"} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="avatar" className="">
                      <div className="text-sm font-medium text-gray-700 mb-2.5">
                        Poză de profil
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
                            src={user?.avatar?.url}
                            alt={"Poză de profil"}
                            width={100}
                            height={100}
                          />
                        )}
                        <div className={"pointer-events-none"}>
                          <Button color={"white"} type="button">
                            {!hasAvatar ? "Încarcă poză" : "Schimbă poză"}
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
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-end gap-4">
                <Button to="/profile" color="white">
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
export default EditProfile;
