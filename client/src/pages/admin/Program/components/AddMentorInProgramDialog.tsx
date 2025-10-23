"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProgramMentorModel } from "@/services/api/get-program.api";
import type { MentorModel } from "@/services/api/list-mentors.api";

import { useUpdateProgramMutation } from "@/services/program.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRouteApi } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  mentorId: z.string().min(1, "Alege o persoană resusrsa."),
});
type AddMentorForm = z.infer<typeof formSchema>;

type AddMentorInProgramDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableMentors: MentorModel[];
  existingMentors: ProgramMentorModel[];
};
const route = getRouteApi("/(app)/programs/$programId");

export function AddMentorInProgramDialog({
  open,
  onOpenChange,
  availableMentors,
  existingMentors,
}: AddMentorInProgramDialogProps) {
  const { programId } = route.useParams();
  const { mutate: updateProgram } = useUpdateProgramMutation();

  const form = useForm<AddMentorForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mentorId: "",
    },
  });

  const onSubmit = (values: AddMentorForm) => {
    form.reset();
    updateProgram(
      {
        programId,
        mentorIds: [...existingMentors.map((x) => x.id), +values.mentorId],
      },
      {
        onSuccess: () => {
          toast.success("Mentor adăugat în program");
          onOpenChange(false);
        },
        onError: () => {
          toast.error("A apărut o erroare");
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      modal={true}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent
        className="sm:max-w-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-start">
          <DialogTitle>Adaugă persoană resursă în program</DialogTitle>
        </DialogHeader>
        <div className="w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3">
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-0.5"
            >
              <FormField
                control={form.control}
                name="mentorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persoană resursă</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Alege persoană resursă" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableMentors
                          .map((mentor) => ({
                            value: mentor.id.toString(),
                            label:
                              mentor.firstName || mentor.lastName
                                ? `${mentor.firstName ?? ""} ${
                                    mentor.lastName ?? ""
                                  }`.trim()
                                : "-",
                          }))
                          .map((d, idx) => (
                            <SelectItem key={idx} value={d.value}>
                              {d.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => {
              form.reset();
              onOpenChange(false);
            }}
          >
            Renunță
          </Button>
          <Button type="submit" form="user-form">
            Salvează
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
