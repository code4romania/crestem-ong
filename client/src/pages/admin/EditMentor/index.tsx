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
import type {
  DimensionModel as ApiDimensionModel,
  FinalDetailedUserModel,
  FinalProgramModel,
} from "@/services/api/types";
import {
  updateMentorMutation,
  useUploadPictureMutation,
} from "@/services/user.mutations";
import { toast } from "sonner";

import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import { Route } from "@/routes/(app)/mentors/$mentorId/edit";
import { useSuspenseGetUserDetails } from "@/services/user.queries";
import { Badge } from "@/components/ui/badge";

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
  mentorPrograms: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .catch([]),
  avatar: z.custom<File>().nullable(),
});

export type MentorInput = z.infer<typeof mentorSchema>;
const programsMapper = (programs: FinalProgramModel[]) =>
  programs.map((p) => ({
    value: p.id.toString(),
    label: p.name,
    disabled: new Date() > new Date(p.endDate),
  }));

const dimensionsMapper = (userDimensions: ApiDimensionModel[]) =>
  userDimensions
    ? userDimensions.map((d) => ({ value: d.id.toString(), label: d.name }))
    : [];

const mentorMapper = (user: FinalDetailedUserModel) => ({
  ...user,
  dimensions: dimensionsMapper(user.dimensions ?? []),
  mentorPrograms: programsMapper(user.mentorPrograms ?? []),
});

const EditMentor = () => {
  const navigate = useNavigate();
  const { mentorId } = Route.useParams();
  const { data: mentor } = useSuspenseGetUserDetails(mentorId, mentorMapper);
  const { data: programs } = useSuspenseListPrograms(programsMapper);
  const { data: dimensions } = useSuspenseListDimensions(dimensionsMapper);

  const { mutateAsync: updateMentor, isPending } = updateMentorMutation();
  const { mutateAsync: uploadAvatar } = useUploadPictureMutation();

  const form = useForm<MentorInput>({
    resolver: zodResolver(mentorSchema),
    defaultValues: {
      firstName: mentor?.firstName ?? "",
      lastName: mentor?.lastName ?? "",
      email: mentor?.email ?? "",
      bio: mentor?.bio ?? "",
      expertise: mentor?.expertise ?? "",
      dimensions: mentor?.dimensions ?? [],
      mentorPrograms: mentor?.mentorPrograms ?? [],
    },
  });

  const onSubmitHandler: SubmitHandler<MentorInput> = async (values) => {
    await updateMentor(
      {
        ...values,
        id: +mentorId,
        mentorPrograms: values.mentorPrograms.map((p) => +p.value),
        dimensions: values.dimensions.map((d) => +d.value),
      },
      {
        onError: () => {
          toast.error("A aparut o problema la actualizarea persoanei resursa");
        },
      }
    );

    if (values.avatar) {
      uploadAvatar({ userId: +mentorId, file: values.avatar });
    }

    navigate({ to: "/mentors" });
    toast.success("Persoana resursa a fost actualizata cu succes!");
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
                        Nume persoană resursă
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
                        Prenume persoană resursă
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
                      Email persoană resursă
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
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
                      <MinimalTiptapEditor
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full"
                        editorContentClassName="p-5"
                        output="html"
                        placeholder="Scrie o scurtă descriere..."
                        editable={true}
                        editorClassName="focus:outline-hidden"
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
                      <MinimalTiptapEditor
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full"
                        editorContentClassName="p-5"
                        output="html"
                        placeholder="Descriere ariile de expertiză ale persoanei resursă"
                        editable={true}
                        editorClassName="focus:outline-hidden"
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
                              key={dimension.label}
                              value={dimension.value}
                              label={dimension.label}
                            >
                              <span>{dimension.label}</span>
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
                name="mentorPrograms"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Programe asociate</FormLabel>
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
                              key={program.label}
                              value={program.value}
                              label={program.label}
                              disabled={program.disabled}
                            >
                              <div className="flex items-center gap-2">
                                {program.label}
                                {program.disabled ? (
                                  <Badge variant="warning">Finalizat</Badge>
                                ) : (
                                  <Badge variant="default">
                                    In desfășurare
                                  </Badge>
                                )}
                              </div>
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
                        currentLogo={mentor?.avatar?.url}
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

export default EditMentor;
