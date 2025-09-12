import React, { useCallback, useEffect } from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Button from "@/components/Button";
import {
  useCreateActivityMutation,
  useGetActivityTypesQuery,
  useGetDimensionsQuery,
} from "@/redux/api/userApi";
import Select from "@/components/Select";
import Form from "@/components/Form";
import { useAppSelector } from "@/redux/store";
import type { User } from "@/redux/api/types";
import { ErrorMessage } from "@hookform/error-message";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";

const ButtonGroup = ({ className }: { className?: string }) => (
  <div className={`${className} flex space-x-4 justify-end`}>
    <Button color="white" to={"/activities"}>
      Renunță
    </Button>
    <Button type="submit">Salvează detalii</Button>
  </div>
);

const activitySchema = z.object({
  user: z.string(),
  dimension: z.string(),
  startDate: z.string().min(1, "Introduceti data activitatii"),
  type: z.string(),
  duration: z.string().min(1, "Introduceti durata activitatii"),
  notes: z.string().optional(),
});

export type ActivityInput = z.infer<typeof activitySchema>;

const NewActivity = () => {
  const user = useAppSelector((state) => state.userState.user);
  const navigate = useNavigate();
  const { data: dimensions } = useGetDimensionsQuery();
  const { data: activityTypes } = useGetActivityTypesQuery();
  const methods = useForm<ActivityInput>({
    resolver: zodResolver(activitySchema),
  });
  const { register, handleSubmit, formState } = methods;
  const [createActivity, { isSuccess }] = useCreateActivityMutation();

  const onSubmitHandler = useCallback(
    (data: ActivityInput) => {
      createActivity({
        ...data,
        mentor: user.id,
      });
    },
    [createActivity]
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/activities");
    }
  }, [isSuccess, navigate]);

  const users = user?.programs?.reduce(
    (acc, program) =>
      acc.concat(
        program.users.map((user: User) => ({
          label: user.ongName,
          name: user.id,
        }))
      ),
    []
  );

  return (
    <FormProvider {...methods}>
      <Section>
        <Heading level={"h2"}>Adaugă activitate</Heading>
      </Section>
      <Section>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
          <div className="flex space-x-4">
            {users && (
              <div className="w-1/2">
                <Select
                  name="user"
                  label="Organizație"
                  options={users}
                  register={register}
                />
              </div>
            )}
            {activityTypes && (
              <div className="w-1/2">
                <Select
                  name="type"
                  label="Tip activitate"
                  options={activityTypes.map((type) => ({
                    label: type.name,
                    name: type.id,
                  }))}
                  register={register}
                />
              </div>
            )}
          </div>
          {dimensions && (
            <div>
              <Select
                name="dimension"
                label="Dimensiune"
                options={dimensions.map((dimension) => ({
                  label: dimension.name,
                  name: dimension.id,
                }))}
                register={register}
              />
            </div>
          )}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <div className="text-gray-700 text-sm leading-5 font-medium mb-1">
                Durată activitate (ore)
              </div>
              <input
                className="w-full border-gray-300 rounded-md"
                placeholder="Durată activitate (ore)"
                type="number"
                {...register("duration")}
              />
              <div className="text-red-600 text-sm mt-1">
                <ErrorMessage name="duration" errors={formState.errors} />
              </div>
            </div>
            <div className="w-1/2">
              <div className="text-gray-700 text-sm leading-5 font-medium mb-1">
                Dată
              </div>
              <input
                type="date"
                className="w-full border-gray-300 rounded-md"
                {...register("startDate")}
              />
              <div className="text-red-600 text-sm mt-1">
                <ErrorMessage name="startDate" errors={formState.errors} />
              </div>
            </div>
          </div>
          <div className="border-gray-300 rounded-md">
            <Form.Textarea name="notes" label="Notițe" register={register} />
          </div>
          <ButtonGroup />
        </form>
      </Section>
    </FormProvider>
  );
};

export default NewActivity;
