import React, { useEffect } from "react";
import { array, boolean, number, object, string, TypeOf } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toast } from "react-toastify";
import {
  useGetDimensionsQuery,
  useGetProgramsQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { useNavigate } from "react-router-dom";
import MultiSelect from "@/components/MultiSelect";
import { ErrorMessage } from "@hookform/error-message";
import Toggle from "@/components/Toggle";
import Select from "@/components/Select";

const mentorProfileSchema = object({
  firstName: string(),
  lastName: string(),
  email: string()
    .min(1, "Adresa de email este obligatorie")
    .email("Email Address is invalid"),
  bio: string().min(1, "Adaugati o scurta descriere"),
  expertise: string(),
  dimensions: array(number()),
  program: string(),
  available: boolean(),
});

export type MentorProfileInput = TypeOf<typeof mentorProfileSchema>;

const EditProfile = () => {
  const user = useAppSelector((state) => state.userState.user);
  const [updateMentorProfile, { isSuccess, isError, error, data }] =
    useUpdateUserMutation();
  const { data: programs, isLoading: isLoadingPrograms } =
    useGetProgramsQuery();
  const { data: dimensions, isLoading: isLoadingDimensions } =
    useGetDimensionsQuery();

  const methods = useForm<MentorProfileInput>({
    resolver: zodResolver(mentorProfileSchema),
    defaultValues: {
      ...user,
      available: user.available || false,
      program: user.program.id.toString(),
      dimensions: user.dimensions.map(({ id }) => id),
    },
  });

  console.log("programs", programs);
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
    if (isSuccess) {
      navigate("/profile");
    }
  }, [isSuccess, dispatch]);

  const onSubmitHandler: SubmitHandler<MentorProfileInput> = async (data) => {
    console.log("data", data);
    updateMentorProfile({
      id: user?.id,
      ...data,
    });
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
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descriere (bio)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("bio")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"bio"} />
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
                      Arii de expertiză
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        {...methods.register("expertise")}
                      />
                      <div className="text-red-400 text-sm py-2">
                        <ErrorMessage name={"expertise"} />
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
