import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCreateReportMutation } from "@/services/reports.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { Calendar as CalendarIcon, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const today = new Date();
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 30);

const reportSchema = z.object({
  startDate: z
    .date({ error: "Alegeți o dată validă" })
    .optional()
    .refine((data) => !!data, {
      message: "Alegeți o dată validă",
    })
    .refine((data) => data! > today, {
      message: "Alegeti o data in viitor",
    }),
  deadline: z
    .date({ error: "Alegeți o dată validă" })
    .optional()
    .refine((data) => !!data, {
      message: "Alegeți o dată validă",
    })
    .refine((data) => data! > today, {
      message: "Alegeti o data in viitor",
    }),
  evaluations: z
    .array(
      z.object({
        value: z.email({ message: "Adresa de email este invalidă" }),
      })
    )
    .min(1, "Adagua o minim o adresa de email"),
});

export type ReportInput = z.infer<typeof reportSchema>;

const ButtonGroup = ({ className }: { className?: string }) => (
  <div className={`${className} flex space-x-4`}>
    <Button variant="secondary" asChild>
      <Link to={"/"}>Renunță</Link>
    </Button>
    <Button type="submit">Salvează detalii</Button>
  </div>
);

const NewReport = () => {
  const navigate = useNavigate();
  const form = useForm<ReportInput>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      evaluations: [],
      startDate: new Date(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "evaluations",
    control: form.control,
  });

  const { mutate: createReport } = useCreateReportMutation();

  const onSubmit = (data: ReportInput) => {
    createReport(
      {
        deadline: data.deadline!,
        evaluations: data.evaluations.map((e) => e.value),
      },
      {
        onError: (error) => {
          const errorResponse = (error as any)?.response?.data?.error;

          toast.error(errorResponse.message);
        },
        onSuccess: (response) => {
          navigate({
            to: `/reports/$reportId`,
            params: { reportId: response.data.id.toString() },
          });
        },
      }
    );
  };

  return (
    <Section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Detalii evaluare */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between">
              <h2 className="text-xl font-semibold">
                Setează detalii evaluare
              </h2>
            </div>
            <div>
              <p className="text-gray-700 text-base font-medium">
                Setează perioada de evaluare
              </p>
              <div className="flex gap-6 mt-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Dată început</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: ro })
                              ) : (
                                <span>Alege data de inceput</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > maxDate || date < new Date()
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Invită membrii */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">
                Invită membrii organizației
              </h2>
              <p className="text-gray-700 text-sm font-bold mt-2">
                Pentru a putea păstra confidențialitatea răspunsurilor
                individuale este necesar ca și tu, ca administrator al
                organizației să îți trimiți o invitație de completare a matricei
                de evaluare.
              </p>
              <p className="text-gray-700 text-sm mt-2">
                Adaugă aici toate adresele de email ale colegilor pe care îi
                inviți să completeze și adaugă și adresa ta de email. Această
                adresă trebuie să fie diferită de adresa pe care ai completat-o
                ca email al organizației la crearea contului.
              </p>
            </div>
            <Separator />
            <div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                  <FormField
                    control={form.control}
                    name={`evaluations.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Adrese email evaluatori
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormDescription
                          className={cn(index !== 0 && "sr-only")}
                        >
                          Adaugă adresele de email către care vrei să trimiți
                          invitațiile, inclusiv a ta
                        </FormDescription>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ value: "" })}
              >
                Adauga email
              </Button>
            </div>

            <ButtonGroup />
          </div>
        </form>
      </Form>
    </Section>
  );
};

export default NewReport;
