import React, { useCallback, useEffect } from "react";
import Section from "@/components/Section";
import { useCreateReportMutation } from "@/redux/api/userApi";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { object, string, date, preprocess, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

const reportSchema = object({
  deadline: preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, date().min(new Date(), { message: "Alegeti o data in viitor" })),
  evaluations: string().optional(),
});

export type ReportInput = TypeOf<typeof reportSchema>;

const ButtonGroup = ({ className }: { className: string }) => (
  <div className={`${className} flex space-x-4`}>
    <Button color="white" to={"/"}>
      Renunță
    </Button>
    <Button type="submit">Salvează detalii</Button>
  </div>
);

const NewReport = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<ReportInput>({
    resolver: zodResolver(reportSchema),
  });

  const [createReport, { data, isSuccess, error }] = useCreateReportMutation();
  useEffect(() => {
    if (isSuccess && data) {
      navigate(`/reports/${data.id}`);
    }
  }, [navigate, isSuccess, data?.id]);

  useEffect(() => {
    if (error?.data?.error?.message) {
      toast.error(error.data.error.message);
    }
  }, [error?.data?.error?.message]);

  const onSubmitHandler = useCallback((form: ReportInput) => {
    const evaluations = form.evaluations?.split("\n") || [];
    createReport({
      deadline: form.deadline,
      evaluations: form.evaluations,
    });
  }, []);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const max = maxDate.toISOString().substring(0, 10);
  const today = new Date().toISOString().substring(0, 10);

  return (
    <Section>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="divide-y divide-gray-300">
          <div className="flex flex-wrap gap-4 justify-between py-6">
            <div className="text-xl">Setează detalii evaluare</div>
            <ButtonGroup className={"hidden md:flex"} />
          </div>
          <div className="py-6">
            <div className={"text-gray-700 text-base leading-6 font-medium"}>
              Setează perioada de evaluare
            </div>
            <div className="flex gap-6 mt-4">
              <div>
                <div className="text-gray-700 text-sm leading-5 font-medium mb-1">
                  Dată început
                </div>
                <input
                  type="date"
                  disabled
                  defaultValue={today}
                  className="border-gray-300 rounded-md"
                />
              </div>
              <div>
                <div className="text-gray-700 text-sm leading-5 font-medium mb-1">
                  Dată final
                </div>
                <input
                  type="date"
                  className="border-gray-300 rounded-md"
                  min={today}
                  max={max}
                  {...register("deadline")}
                />
                <div className="text-red-600 text-sm mt-1">
                  <ErrorMessage name="deadline" errors={formState.errors} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-300">
          <div className="py-6">
            <div className="text-xl">Invită membrii organizației</div>
            <p className="text-gray-500 text-sm leading-5 font-normal mt-2">
              Pentru a putea păstra confidențialitatea răspunsurilor individuale
              este necesar ca și tu, ca administrator al organizației să îți
              trimiți o invitație de completare a matricei de evaluare. Adaugă
              aici toate adresele de email ale colegilor pe care îi inviți să
              completeze și adaugă și adresa ta de email. Această adresă trebuie
              să fie diferită de adresa pe care ai completat-o ca email al
              organizației la crearea contului.
            </p>
          </div>
          <div className="py-6">
            <div className="mb-2">
              Adaugă adresele de email către care vrei să trimiți invitațiile.
            </div>
            <div className="flex gap-10 w-full md:w-2/3 lg:w-1/2">
              <textarea
                rows={4}
                className="rounded-md border-gray-300 w-full"
                {...register("evaluations")}
              />
            </div>
            <ButtonGroup className={"mt-4 md:hidden"} />
          </div>
        </div>
      </form>
    </Section>
  );
};

export default NewReport;
