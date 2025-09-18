import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProgramMutation } from "@/services/program.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ro } from "date-fns/locale";
import { zhTW } from "date-fns/locale";
const today = new Date();
const programSchema = z
  .object({
    name: z.string().min(1, "Denumirea programului este obligatorie"),
    startDate: z
      .date({ error: "Alegeți o dată validă" })
      .optional()
      .refine((data) => !!data, {
        message: "Alegeți o dată validă",
      })
      .refine((data) => data! > today, {
        message: "Data de început trebuie să fie în viitor",
      }),
    endDate: z
      .date({ error: "Alegeți o dată validă" })
      .optional()
      .refine((data) => !!data, {
        message: "Alegeți o dată validă",
      }),
    description: z.string().min(1, "Descrierea este obligatorie"),
    sponsorName: z.string(),
  })
  .refine((data) => data.endDate! > data.startDate!, {
    message: "Data de sfârșit trebuie să fie după data de început",
    path: ["endDate"],
  });

export type ProgramInput = z.infer<typeof programSchema>;

const CreateProgram = () => {
  const form = useForm<ProgramInput>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      description: "",
      name: "",
      sponsorName: "",
    },
  });

  const navigate = useNavigate();

  const { mutate: createProgram, isPending } = useCreateProgramMutation();

  const onSubmit = (data: ProgramInput) => {
    createProgram(
      {
        ...data,
        startDate: data.startDate!.toISOString(),
        endDate: data.endDate!.toISOString(),
      },
      {
        onSuccess: async (program) => {
          toast.success("Program creat cu success");
          await navigate({
            to: "/programs/$programId",
            params: { programId: program.data.id.toString() },
          });
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Adaugă program</h1>
        <p className="text-muted-foreground">
          Completează informațiile pentru a crea un program nou
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusIcon className="h-5 w-5" />
                Informații despre program
              </CardTitle>
              <CardDescription>
                Completează detaliile de bază ale programului
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Denumire program <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Introdu denumirea programului"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Range */}
              <div className="flex flex-col gap-2">
                <FormLabel>
                  Perioadă de desfășurare{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <div className=" flex w-full gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-56">
                        <DateTimePicker
                          granularity="day"
                          value={field.value}
                          onChange={field.onChange}
                          locale={ro}
                          displayFormat={{
                            hour24: "PPP",
                            hour12: "PP",
                          }}
                          placeholder="Data de început"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-56">
                        <DateTimePicker
                          granularity="day"
                          value={field.value}
                          onChange={field.onChange}
                          locale={ro}
                          displayFormat={{
                            hour24: "PPP",
                            hour12: "PP",
                          }}
                          placeholder="Data de sfârșit"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="sponsorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume finanțator</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Introdu numele finanțatorului"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Descriere <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Introdu descrierea programului"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Renunță
            </Button>
            <Button type="submit" disabled={isPending}>
              Salvează
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProgram;
