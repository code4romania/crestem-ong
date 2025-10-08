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
import { Link, useNavigate } from "@tanstack/react-router";
import { Briefcase, User } from "lucide-react";

import FullScreenLoader from "@/components/FullScreenLoader";
import { Button } from "@/components/ui/button";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import { Switch } from "@/components/ui/switch";
import {
  mentorProfileSchema,
  type MentorProfileInput,
} from "@/pages/mentor/EditProfile";
import { Route } from "@/routes/(app)/users/$userId/edit";
import type {
  FinalDimensionModel,
  FinalUserModel,
  ProgramFinalModel,
} from "@/services/api/types";
import {
  updateMentorMutation,
  useUploadPictureMutation,
} from "@/services/user.mutations";
import {
  useGetUserDimensions,
  useSuspenseGetUserDetails,
} from "@/services/user.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
const optionsMapper = (
  userDimensions: FinalDimensionModel[] | ProgramFinalModel[]
) =>
  userDimensions
    ? userDimensions.map((d) => ({ value: d.id.toString(), label: d.name }))
    : [];

const mentorMapper = (user: FinalUserModel) => ({
  ...user,
  dimensions: optionsMapper(user.dimensions ?? []),
});

function EditMentor() {
  const { userId } = Route.useParams();
  const { data: userDetails } = useSuspenseGetUserDetails(userId, mentorMapper);
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

  const form = useForm<MentorProfileInput>({
    resolver: zodResolver(mentorProfileSchema),
    defaultValues: {
      firstName: userDetails.firstName || "",
      lastName: userDetails.lastName || "",
      dimensions: userDetails.dimensions ?? [],
      available: userDetails.available || false,
      avatar: undefined,
      bio: userDetails.bio || "",
      expertise: userDetails.expertise || "",
    },
  });

  const onSubmit: SubmitHandler<MentorProfileInput> = async (data) => {
    await updatementor(
      {
        ...data,
        id: userDetails!.id,
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
      await uploadAvatar({ userId: userDetails.id, file: data.avatar });
    }

    navigate({ to: "/users/$userId", params: { userId: userId } });
    toast.success("Salvat");
  };

  return (
    <div>
      <Section>
        <div className="space-y-2">
          <Heading level="h2">
            Editează profilul: {userDetails.firstName} {userDetails.lastName}
          </Heading>
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
                        <MinimalTiptapEditor
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full"
                          editorContentClassName="p-5"
                          output="html"
                          placeholder="Scrie o scurtă descriere..."
                          autofocus={true}
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
                          autofocus={true}
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
                          currentLogo={userDetails?.avatar?.url}
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
}
export default EditMentor;
