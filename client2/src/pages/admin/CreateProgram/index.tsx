import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, object, preprocess, string, TypeOf } from "zod";
import { ErrorMessage } from "@hookform/error-message";
import { useCreateProgramMutation } from "@/redux/api/userApi";
import { useNavigate } from "react-router-dom";

const programSchema = object({
  name: string().min(1, "Denumirea programului este obligatorie"),
  startDate: preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, date({ invalid_type_error: "Alegeti o data" }).min(new Date(), { message: "Alegeti o data in viitor" })),
  endDate: preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, date({ invalid_type_error: "Alegeti o data" }).min(new Date(), { message: "Alegeti o data in viitor" })),
  description: string(),
  sponsorName: string().optional(),
});

export type ProgramInput = TypeOf<typeof programSchema>;

const Input = ({ register, name, label, errors, ...rest }) => (
  <div className="container mt-0 mr-auto mb-0 ml-auto pt-2 pb-2">
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

const CreateProgram = () => {
  const methods = useForm<ProgramInput>({
    resolver: zodResolver(programSchema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;
  const navigate = useNavigate();

  const [createProgram, { isSuccess, isError }] = useCreateProgramMutation();

  const onSubmitHandler = (data: ProgramInput) => {
    createProgram(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/programs");
    }
  }, [isSuccess]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Section>
          <Heading level={"h2"}>Adaugă program</Heading>
        </Section>
        <Section>
          <div className="text-lg leading-6 font-medium">
            Informații despre program
          </div>
        </Section>
        <Section>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">Denumire program</div>
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Introdu denumire program"
                register={register}
                errors={errors}
                name={"name"}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="w-1/2">Perioadă de desfășurare</div>
            <div className="flex md:w-1/2 space-x-8">
              <div className="w-1/2">
                <Input
                  name="startDate"
                  placeholder="Introdu data de început"
                  type="date"
                  register={register}
                  errors={errors}
                  autoComplete="off"
                />
              </div>
              <div className="w-1/2">
                <Input
                  name="endDate"
                  placeholder="Introdu data de final"
                  type="date"
                  register={register}
                  errors={errors}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-1/2">
              <div>Nume finanțator</div>
            </div>
            <div className="flex w-full md:w-1/2">
              <Input
                name="sponsorName"
                placeholder="Introdu nume finanțator"
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">Descriere</div>
            <div className="w-full md:w-1/2">
              <textarea
                placeholder="Introdu descrierea programului"
                className="border focus:ring-teal-500 focus:border-teal-500
            w-full block border-gray-300 shadow-sm rounded-md sm:text-sm pt-2 pr-4 pb-2 pl-4"
                rows={4}
                {...register("description")}
              />
            </div>
          </div>
        </Section>
        <Section>
          <div className="flex space-x-3 justify-end">
            <Button to="/programs" color="white">
              Renunță
            </Button>
            <Button type="submit">Salvează</Button>
          </div>
        </Section>
      </form>
    </FormProvider>
  );
};

export default CreateProgram;
