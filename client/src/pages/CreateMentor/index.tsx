import React from "react";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import {
  useCreateMentorMutation,
  useGetDimensionsQuery,
  useGetProgramsQuery,
} from "@/redux/api/userApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { object, string, TypeOf } from "zod";
import { LoginInput } from "@/pages/public/Login";

const mentorSchema = object({
  firstName: string(),
  lastName: string(),
  email: string(),
  bio: string(),
  expertise: string(),
  dimensions: string(),
  programs: string(),
});

export type MentorInput = TypeOf<typeof mentorSchema>;

const InputField = ({ label, children }) => (
  <div className="flex items-center">
    <div className="w-1/3">{label}</div>
    <div className="w-2/3">{children}</div>
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

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    console.log("values", values);
    createMentor(values);
  };

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
              {...register("lastName")}
            />
          </InputField>
          <InputField label="Prenume persoană resursă">
            <Input
              placeholder="Introdu prenume persoană resursă"
              {...register("firstName")}
            />
          </InputField>
          <InputField label="Email persoană resursă">
            <Input
              placeholder="Introdu email persoană resursă"
              type="email"
              {...register("email")}
            />
          </InputField>
          <InputField label="Descriere (bio)">
            <textarea
              className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              placeholder="Adaugă o scurtă descriere a persoanei resursă"
            />
          </InputField>
          <InputField label="Arii de expertiză">
            <textarea
              className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              placeholder="Descriere ariile de expertiză ale persoanei resursă"
            />
          </InputField>
          {!isLoadingDimensions && (
            <InputField label="Specializare pe dimensiuni">
              <Select
                name={"dimensions"}
                options={[
                  {
                    name: null,
                    label: "Alege toate variantele care se aplică",
                  },
                  ...dimensions?.map(({ name }) => ({
                    name,
                    label: name,
                  })),
                ]}
              />
            </InputField>
          )}
          {!isLoadingPrograms && (
            <InputField label="Program asociat">
              <Select
                name={"programs"}
                options={[
                  {
                    name: null,
                    label: "Alege toate variantele care se aplică",
                  },
                  ...programs?.map(({ name }) => ({
                    name,
                    label: name,
                  })),
                ]}
              />
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
