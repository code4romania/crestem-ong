import { useSuspenseListDimensions } from "@/services/dimensions.queries";
import { useCreateMentorMutation } from "@/services/fdsc.mutations";
import { useSuspenseListPrograms } from "@/services/programs.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { LogoUpload } from "@/components/PictureSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { useUploadPictureMutation } from "@/services/user.mutations";
import { toast } from "sonner";

const mentorSchema = z.object({
  firstName: z.string().min(1, "Nume este obligatoriu"),
  lastName: z.string().min(1, "Prenume este obligatoriu"),
  email: z
    .email("Adresa de email este invalidă")
    .min(1, "Adresa de email este obligatorie"),
  bio: z.string().min(1, "Adaugati o scurta descriere"),
  expertise: z.string().optional(),
  dimensions: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, "Selectează cel puțin o specializare")
    .catch([]),
  programs: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, "Selectează cel puțin un program")
    .catch([]),
  avatar: z.custom<File>().nullable(),
});

export type MentorInput = z.infer<typeof mentorSchema>;

const CreateMentor = () => {
  const navigate = useNavigate();

  const { data: programs } = useSuspenseListPrograms();

  const { data: dimensions } = useSuspenseListDimensions();
  const { mutateAsync: createMentor, isPending } = useCreateMentorMutation();

  const { mutateAsync: uploadAvatar } = useUploadPictureMutation();

  const form = useForm<MentorInput>({
    resolver: zodResolver(mentorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      expertise: "",
      dimensions: [],
      programs: [],
    },
  });

  const onSubmitHandler: SubmitHandler<MentorInput> = async (values) => {
    const mentor = await createMentor(
      {
        ...values,
        programs: values.programs.map((p) => +p.value),
        dimensions: values.programs.map((d) => +d.value),
      },
      {
        onError: (error) => {
          const errorResponse = (error as any)?.response?.data?.error;
          const message = errorResponse?.message;

          if (message == "Email already taken") {
            form.setError("email", {
              message: "Persoana resursa are un cont in platforma",
            });
            toast.error("Acest email este deja folosit");
          } else {
            toast.error("A aparut o problema");
          }
        },
      }
    );

    if (values.avatar) {
      uploadAvatar({ userId: mentor.id, file: values.avatar });
    }

    navigate({ to: "/mentors" });
    toast.success("Persoana resursa a fost invitata prim email cu succes!");
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Adaugă persoană resursă</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(onSubmitHandler)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nume persoană resursă{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Introdu nume persoană resursă"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Prenume persoană resursă{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Introdu prenume persoană resursă"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email persoană resursă{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Introdu email persoană resursă"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Descriere (bio) <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Adaugă o scurtă descriere a persoanei resursă"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arii de expertiză</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descriere ariile de expertiză ale persoanei resursă"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dimensions"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Specializare pe dimensiuni
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <MultiSelector
                      onValuesChange={field.onChange}
                      values={field.value}
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Alege domenii" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {dimensions.map((dimension) => (
                            <MultiSelectorItem
                              key={dimension.name}
                              value={dimension.id.toString()}
                              label={dimension.name}
                            >
                              <span>{dimension.name}</span>
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="programs"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Program asociat <span className="text-red-500">*</span>
                    </FormLabel>
                    <MultiSelector
                      onValuesChange={field.onChange}
                      values={field.value}
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Alege programe" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {programs.map((program) => (
                            <MultiSelectorItem
                              key={program.name}
                              value={program.id.toString()}
                              label={program.name}
                            >
                              <span>{program.name}</span>
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poza profil</FormLabel>
                    <FormControl>
                      <LogoUpload
                        onImageChange={(file) => field.onChange(file)}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate({ to: "/mentors" })}
                >
                  Renunță
                </Button>
                <Button type="submit">Salvează</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateMentor;
