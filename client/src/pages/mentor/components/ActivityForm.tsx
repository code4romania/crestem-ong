import Section from "@/components/Section";
import { Button } from "@/components/ui/button";

import { useListMentees } from "@/services/user.queries";

import FullScreenLoader from "@/components/FullScreenLoader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Select, SelectTrigger } from "@/components/ui/select";
import { useListActivityTypes } from "@/services/activity-types.queries";
import { useListDimensions } from "@/services/dimensions.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Calendar } from "@/components/ui/calendar";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";
import type { MentorActivityModel } from "@/services/api/types";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

const activitySchema = z.object({
  user: z.string().min(1, "Selectați ONG-ul"),
  dimension: z.string().min(1, "Selectați dimensiune"),
  startDate: z.date({ error: "Introduceti data activitatii" }),
  type: z.string().min(1, "Selectați tipul activității"),
  duration: z.string().min(1, "Introduceti durata activitatii"),
  notes: z.string().optional(),
});

export type ActivityInput = z.infer<typeof activitySchema>;

function ActivityForm({
  onSubmit,
  activity,
}: {
  onSubmit: (data: ActivityInput) => void;
  activity?: MentorActivityModel;
}) {
  const { user } = useAuth();
  const { data: dimensions, isLoading: loadingDimensions } = useListDimensions(
    (dimensions) =>
      dimensions.map((at) => ({
        label: at.name,
        value: at.id.toString(),
      }))
  );
  const { data: activityTypes, isLoading: loadingActivityTypes } =
    useListActivityTypes((activityTypes) =>
      activityTypes.map((at) => ({
        label: at.name,
        value: at.id.toString(),
      }))
    );
  const { data: users, isLoading: loadingUsers } = useListMentees((mentees) =>
    mentees.map((mentee) => ({
      label: mentee.ongName,
      value: mentee.id.toString(),
    }))
  );

  const form = useForm<ActivityInput>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      user: activity?.user.id.toString() ?? "",
      type: activity?.type.id.toString() ?? "",
      dimension: activity?.dimension.id.toString() ?? "",
      notes: activity?.notes ?? "",
      duration: activity?.duration.toString() ?? "",
      startDate: activity?.startDate
        ? new Date(activity.startDate)
        : new Date(),
    },
  });

  if (loadingDimensions || loadingActivityTypes || loadingUsers) {
    return <FullScreenLoader />;
  }

  return (
    <Section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizație</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={form.formState.isSubmitting}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Selectați organizația" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users?.map((user) => (
                        <SelectItem key={user.value} value={user.value}>
                          {user.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tip activitate</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={form.formState.isSubmitting}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Selectați tipul activității" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activityTypes?.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="dimension"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dimensiune</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={form.formState.isSubmitting}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selectați dimensiunea" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dimensions?.map((dimension) => (
                      <SelectItem key={dimension.value} value={dimension.value}>
                        {dimension.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durată activitate (ore)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Durată"
                      className="w-48"
                      type="number"
                      min="0"
                      step="0.5"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Dată</FormLabel>
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
                        disabled={(date) =>
                          date < new Date("1900-01-01") || date > new Date()
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

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notițe</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Adăugați notițe despre activitate..."
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={"flex space-x-4 justify-end"}>
            <Button variant="secondary" asChild>
              <Link to={"/activities"}>Renunță</Link>
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Salvează detalii
            </Button>
          </div>
        </form>
      </Form>
    </Section>
  );
}

export default ActivityForm;
