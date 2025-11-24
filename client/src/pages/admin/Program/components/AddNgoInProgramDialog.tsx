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
import type { FinalUserModel } from "@/services/api/types";
import { useAssignNgoToProgramMutation } from "@/services/program.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRouteApi } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  ngoId: z.string().min(1, "Alege un ONG."),
});
type AddNgoForm = z.infer<typeof formSchema>;

type AddNgoInProgramDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableNgos: FinalUserModel[];
};
const route = getRouteApi("/(app)/programs/$programId");

export function AddNgoInProgramDialog({
  open,
  onOpenChange,
  availableNgos,
}: AddNgoInProgramDialogProps) {
  const { programId } = route.useParams();
  const { mutate: assignNgoToProgram } = useAssignNgoToProgramMutation();

  const form = useForm<AddNgoForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ngoId: "",
    },
  });

  const onSubmit = (values: AddNgoForm) => {
    assignNgoToProgram(
      { programId, ngoId: +values.ngoId },
      {
        onSuccess: (data) => {
          form.reset();

          toast.success("ONG adăugat în program");
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
      modal={true}
      open={open}
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
          <DialogTitle>Adaugă ONG în program</DialogTitle>
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
                name="ngoId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persoană resursă</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Alege un ONG" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableNgos
                          .map((ngo) => ({
                            value: ngo.id.toString(),
                            label: ngo.ongName ?? "-",
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
