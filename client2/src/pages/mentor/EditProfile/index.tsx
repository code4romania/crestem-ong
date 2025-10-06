import Heading from "@/components/Heading";
import { LogoUpload } from "@/components/PictureSelect";
import Section from "@/components/Section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useListDimensions } from "@/services/dimensions.queries";
import { useListPrograms } from "@/services/programs.queries";
import { Link, useNavigate } from "@tanstack/react-router";
import { Briefcase, User } from "lucide-react";
import { z } from "zod";

import FullScreenLoader from "@/components/FullScreenLoader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type {
  FinalDimensionModel,
  ProgramFinalModel,
} from "@/services/api/types";
import {
  updateMentorMutation,
  useUploadPictureMutation,
} from "@/services/user.mutations";
import {
  useGetUserDimensions,
  useGetUserPrograms,
  useSuspenseGetMe,
} from "@/services/user.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const mentorProfileSchema = z.object({
  firstName: z.string().min(1, "Nume este obligatoriu"),
  lastName: z.string().min(1, "Prenume este obligatoriu"),
  bio: z.string().min(1, "Adaugati o scurta descriere"),
  expertise: z.string().optional(),
  dimensions: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, "Selectează cel puțin o specializare"),
  available: z.boolean(),
  avatar: z.custom<File>(),
});

export type MentorProfileInput = z.infer<typeof mentorProfileSchema>;

const optionsMapper = (
  userDimensions: FinalDimensionModel[] | ProgramFinalModel[]
) =>
  userDimensions
    ? userDimensions.map((d) => ({ value: d.id.toString(), label: d.name }))
    : [];

const EditMentorProfile = () => {
  const { data: user } = useSuspenseGetMe();
  const navigate = useNavigate();

  const { mutateAsync: updatementor, isPending: isUpdatePending } =
    updateMentorMutation();
  const { mutateAsync: uploadAvatar, isPending: isUploadPending } =
    useUploadPictureMutation();

  const { data: dimensions, isLoading } = useListDimensions((dimensions) =>
    dimensions.map((at) => ({
      label: at.attributes.name,
      value: at.id.toString(),
    }))
  );

  const { data: userDimensions, isLoading: userDimensionsLoading } =
    useGetUserDimensions(optionsMapper);

  const form = useForm<MentorProfileInput>({
    resolver: zodResolver(mentorProfileSchema),
    defaultValues: {
      ...user,
      dimensions: userDimensions ?? [],
      available: user?.available || false,
      avatar: undefined,
      bio: user?.bio || "",
    },
  });

  const onSubmit: SubmitHandler<MentorProfileInput> = async (data) => {
    await updatementor(
      {
        ...data,
        id: user!.id,
        dimensions: data.dimensions.map((d) => +d.value),
      },
      {
        onError: (error) => {
          const data = error as any;
          toast.error(data.error.message);
        },
      }
    );

    if (data.avatar) {
      await uploadAvatar({ userId: user!.id, file: data.avatar });
    }

    navigate({ to: "/profile" });
    toast.success("Salvat");
  };

  if (isLoading || userDimensionsLoading) return <FullScreenLoader />;
  return (
    <div>
      <Section>
        <div className="space-y-2">
          <Heading level="h2">Editează profilul de mentor</Heading>
        </div>
      </Section>

      <Section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informații personale
                </CardTitle>
                <CardDescription>
                  Aceste date sunt necesare pentru a-ți completa profilul
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nume <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nume" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Prenume <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Prenume" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Professional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Detalii profesionale
                </CardTitle>
                <CardDescription>
                  Completează detalii despre activitatea ta profesională
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Specializare pe dimensiuni
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <MultiSelector
                        onValuesChange={field.onChange}
                        values={field.value}
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Selectează dimensiuni" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {dimensions?.map((dimension) => (
                              <MultiSelectorItem
                                key={dimension.value}
                                value={dimension.value}
                                label={dimension.label}
                              >
                                {dimension.label}
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
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Descriere (bio) <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Scrie o scurtă descriere..."
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
                          placeholder="Listează ariile de expertiză..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="available"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disponibilitate</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poza de profil</FormLabel>
                      <FormControl>
                        <LogoUpload
                          currentLogo={user?.avatar?.url}
                          onImageChange={(file) => field.onChange(file)}
                          disabled={isUploadPending || isUpdatePending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                className="sm:w-auto bg-transparent"
                asChild
              >
                <Link to="/profile">Renunță</Link>
              </Button>
              <Button
                type="submit"
                className="sm:w-auto"
                disabled={isUploadPending || isUpdatePending}
              >
                Salvează
              </Button>
            </div>
          </form>
        </Form>
      </Section>
    </div>
  );
};
export default EditMentorProfile;
