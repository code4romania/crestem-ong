import React, { useMemo } from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import {
  useCreateMentorMutation,
  useGetDimensionsQuery,
  useGetProgramsQuery,
} from "@/redux/api/userApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { array, number, object, string, TypeOf } from "zod";
import { ErrorMessage } from "@hookform/error-message";
import MultiSelect from "@/components/MultiSelect";

const mentorSchema = object({
  lastName: string(),
  firstName: string(),
  email: string().email(),
  bio: string(),
  expertise: string(),
  dimensions: array(number()),
  programs: array(number()),
});

export type MentorInput = TypeOf<typeof mentorSchema>;

const InputField = ({ label, children }) => (
  <div className="flex items-center">
    <div className="w-1/3">{label}</div>
    <div className="w-2/3">{children}</div>
  </div>
);

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

const CreateMentor = () => {
  const { data: programs, isLoading: isLoadingPrograms } =
    useGetProgramsQuery();
  const { data: dimensions, isLoading: isLoadingDimensions } =
    useGetDimensionsQuery();
  const [createMentor] = useCreateMentorMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<MentorInput>({
    resolver: zodResolver(mentorSchema),
  });

  const onSubmitHandler: SubmitHandler<MentorInput> = (values) => {
    createMentor({
      ...values,
      role: 4,
      username: values.email,
      password: "temporary-password",
    });
  };

  const programsOptions = useMemo(
    () =>
      programs?.map(({ id, name }) => ({
        id: id,
        name: name,
        label: name,
      })),
    [programs]
  );

  const dimensionsOptions = useMemo(
    () =>
      dimensions?.map(({ id, name }) => ({
        id: id,
        name: name,
        label: name,
      })),
    [dimensions]
  );

  return (
    <div>
      <Section>
        <Heading level={"h2"}>Adaugă persoană resursă</Heading>
        <form
          className="mt-10 flex-col space-y-6"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <InputField label="Nume persoană resursă">
            <Input
              placeholder="Introdu nume persoană resursă"
              name="lastName"
              register={register}
              errors={errors}
            />
            <div className="text-red-600 text-sm mt-1">
              <ErrorMessage name="lastName" errors={errors} />
            </div>
          </InputField>
          <InputField label="Prenume persoană resursă">
            <Input
              placeholder="Introdu prenume persoană resursă"
              name="firstName"
              register={register}
            />
            <div className="text-red-600 text-sm mt-1">
              <ErrorMessage name="firstName" errors={errors} />
            </div>
          </InputField>
          <InputField label="Email persoană resursă">
            <Input
              placeholder="Introdu email persoană resursă"
              name="email"
              type="email"
              register={register}
            />
            <div className="text-red-600 text-sm mt-1">
              <ErrorMessage name="email" errors={errors} />
            </div>
          </InputField>
          <InputField label="Descriere (bio)">
            <textarea
              className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              placeholder="Adaugă o scurtă descriere a persoanei resursă"
              {...register("bio")}
            />
            <div className="text-red-600 text-sm mt-1">
              <ErrorMessage name="bio" errors={errors} />
            </div>
          </InputField>
          <InputField label="Arii de expertiză">
            <textarea
              className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              placeholder="Descriere ariile de expertiză ale persoanei resursă"
              {...register("expertise")}
            />
            <div className="text-red-600 text-sm mt-1">
              <ErrorMessage name="expertise" errors={errors} />
            </div>
          </InputField>
          {!isLoadingDimensions && (
            <InputField label="Specializare pe dimensiuni">
              <MultiSelect
                options={dimensionsOptions}
                {...register("dimensions")}
              />
              <div className="text-red-600 text-sm mt-1">
                <ErrorMessage name="dimensions" errors={errors} />
              </div>
            </InputField>
          )}
          {!isLoadingPrograms && (
            <InputField label="Program asociat">
              <MultiSelect
                options={programsOptions}
                {...register("programs")}
              />
              <div className="text-red-600 text-sm mt-1">
                <ErrorMessage name="programs" errors={errors} />
              </div>
            </InputField>
          )}
          <div className="flex justify-end space-x-2.5 mt-10">
            <Button color="white" to="/mentors">
              Renunță
            </Button>
            <Button type="submit">Salvează</Button>
          </div>
        </form>
      </Section>
    </div>
  );
};

export default CreateMentor;
