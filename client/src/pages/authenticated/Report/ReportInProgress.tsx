import Confirm from "@/components/Confirm";
import CreateEvaluation from "@/components/CreateEvaluation";
import TableEvaluations from "@/components/TableEvaluations";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import formatDate from "@/lib/formatDate";
import { cn } from "@/lib/utils";
import type { FinalReportModel } from "@/services/api/types";
import { useUpdateReportMutation } from "@/services/reports.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { DonutChart } from "react-circle-chart";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CallToAction = ({ reportId }: { reportId: number }) => {
  const { mutate: updateReport } = useUpdateReportMutation();
  const [open, setOpen] = useState(false);

  const handleComplete = useCallback(() => {
    updateReport({
      id: reportId,
      finished: true,
      deadline: format(new Date(), "yyyy-MM-dd"),
    });
  }, [reportId]);

  return (
    <>
      <Confirm
        header="Ești sigur că vrei să finalizezi evaluarea?"
        body="Dacă finalizezi acum, persoanele care nu au răspuns la chestionarul de evaluare nu vor putea să mai completeze.
Asigură-te că ai toate răspunsurile înainte de a face această acțiune"
        buttonText="Finalizează evaluarea"
        open={open}
        setOpen={setOpen}
        handleComplete={handleComplete}
      />
      <Button onClick={() => setOpen(true)}>Finalizează evaluare</Button>
    </>
  );
};

const today = new Date();
const reportSchema = z.object({
  deadline: z
    .date({ error: "Alegeți o dată validă" })
    .optional()
    .refine((data) => !!data, {
      message: "Alegeți o dată validă",
    })
    .refine((data) => data! > today, {
      message: "Alegeti o data in viitor",
    }),
});

type ReportInput = z.infer<typeof reportSchema>;

const ReportInProgress = ({ report }: { report: FinalReportModel }) => {
  const reportId = report.id;
  const evaluationsCompleted = useMemo(
    () =>
      report?.evaluations?.filter(({ dimensions }) => dimensions.length === 10),
    [report?.evaluations]
  );
  const canFinish = evaluationsCompleted.length > 0;
  const [editDeadline, setEditDeadline] = useState(false);

  const { mutate: updateReport } = useUpdateReportMutation();

  const form = useForm<ReportInput>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      deadline: new Date(report.deadline),
    },
  });

  const onSubmit = useCallback((form: ReportInput) => {
    updateReport(
      {
        id: reportId,
        deadline: format(form.deadline!, "yyyy-MM-dd"),
      },
      { onSuccess: () => setEditDeadline(false) }
    );
  }, []);

  return (
    <div>
      <div className={"divide-y divide-gray-300 mb-10"}>
        <div className={"flex justify-between mb-4"}>
          <div>Detalii evaluare</div>
          {canFinish && (
            <div className={"hidden md:block"}>
              <CallToAction reportId={reportId} />
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row py-6 space-y-4">
          <div className="flex flex-col items-center md:w-1/3">
            <DonutChart
              size={"sm"}
              trackColor="#688F2380"
              totalTextColor="#047B7D"
              tooltipSx={{
                display: "none",
              }}
              items={[
                {
                  label: "Formulare completate",
                  color: "#047B7D",
                  value: Math.floor(
                    (evaluationsCompleted?.length * 100) /
                      report?.evaluations?.length || 0
                  ),
                },
              ]}
            />
            <div className="flex text-sm space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-teal-600 mr-2" />
                <div>Formulare completate</div>
              </div>
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: "rgba(104, 143, 35, 0.5)" }}
                />
                <div>Formulare necompletate</div>
              </div>
            </div>
          </div>
          <div className={"md:w-2/3"}>
            <div className="text-base leading-6 font-medium mb-2">
              Perioada de evaluare
            </div>
            <div className="flex mt-4 space-x-8">
              <div>
                <div className="text-sm leading-5 font-medium">
                  Data de început:
                </div>
                <div className="mt-2.5">{formatDate(report.createdAt)}</div>
              </div>

              {!editDeadline ? (
                <div>
                  <div className="text-sm leading-5 font-medium">
                    Data de final:
                  </div>

                  <div className="mt-2.5">
                    <div>{formatDate(report.deadline)}</div>
                    <button
                      className="whitespace-nowrap text-sm font-medium text-teal-600 hover:underline mt-2"
                      onClick={() => setEditDeadline(true)}
                    >
                      Editează
                    </button>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>
                            Dată final
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: ro })
                                  ) : (
                                    <span>Alege data de final</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                captionLayout="dropdown"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex space-x-4">
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={() => setEditDeadline(false)}
                      >
                        Renunță
                      </Button>
                      <Button type="submit">Salvează modificări</Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="my-10 md:max-w-xl">
          <CreateEvaluation report={report} />
        </div>
        <TableEvaluations report={report} />
      </div>
      {canFinish && (
        <div className={"md:hidden mt-4"}>
          <CallToAction reportId={reportId} />
        </div>
      )}
    </div>
  );
};

export default ReportInProgress;
