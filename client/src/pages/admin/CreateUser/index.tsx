import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { useSuspenseListDomains } from "@/services/domains.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LogoUpload } from "@/components/PictureSelect";
import { Button } from "@/components/ui/button";
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
import { PasswordInput } from "@/components/ui/password-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { citiesByCounty } from "@/lib/orase-dupa-judet";
import { useCreateNgoMutation } from "@/services/ngo.mutations";
import { useUploadPictureMutation } from "@/services/user.mutations";
import { Link, useNavigate } from "@tanstack/react-router";
import { Building2, Globe, Lock, Mail, Phone, User } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

const organizationSchema = z
  .object({
    ongName: z.string().min(1, "Numele organizației este obligatoriu"),
    ongIdentificationNumber: z
      .string()
      .min(1, "Numărul de identificare este obligatoriu"),
    county: z.string().min(1, "Județul este obligatoriu"),
    city: z.string().min(1, "Orașul este obligatoriu"),
    email: z
      .email("Adresa de email este invalidă")
      .min(1, "Adresa de email este obligatorie"),
    phone: z.string().min(1, "Telefonul este obligatoriu"),
    avatar: z.any().optional(),
    domains: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .catch([]),
    website: z.string(),
    keywords: z.string(),
    description: z.string(),
    contactFirstName: z.string(),
    contactLastName: z.string(),
    contactEmail: z.email("Adresa de email este invalidă").optional(),
    contactPhone: z.string(),
    accountFacebook: z.string().optional(),
    accountTwitter: z.string().optional(),
    accountTiktok: z.string().optional(),
    accountInstagram: z.string().optional(),
    accountLinkedin: z.string().optional(),
    password: z
      .string()
      .min(1, "Parola este obligatorie")
      .min(8, "Parola trebuie sa contina cel putin 8 caractere")
      .max(32, "Parola trebuie sa contina cel mult 32 caractere"),
    confirmPassword: z
      .string()
      .min(1, "Parola este obligatorie")
      .min(8, "Parola trebuie sa contina cel putin 8 caractere")
      .max(32, "Parola trebuie sa contina cel mult 32 caractere"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Ne pare rau, parola nu coincide",
    path: ["confirmPassword"],
  });

type OrganizationFormData = z.infer<typeof organizationSchema>;

const CreateUser = () => {
  const navigate = useNavigate();
  const { data: domains } = useSuspenseListDomains();
  const { mutateAsync: createNgo, isPending } = useCreateNgoMutation();
  const { mutate: uploadPicture } = useUploadPictureMutation();

  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      ongName: "",
      ongIdentificationNumber: "",
      county: "",
      city: "",
      email: "",
      phone: "",
      website: "",
      keywords: "",
      description: "",
      contactFirstName: "",
      contactLastName: "",
      contactEmail: "",
      contactPhone: "",
      accountFacebook: "",
      accountTwitter: "",
      accountTiktok: "",
      accountInstagram: "",
      accountLinkedin: "",
      password: "",
      confirmPassword: "",
      domains: [],
    },
  });

  const county = form.watch("county");

  const counties = Object.keys(citiesByCounty)
    .sort()
    .map((county: string) => ({
      label: county,
      name: county,
    }));

  const availableCities = useMemo(
    () =>
      county
        ? [...new Set(citiesByCounty[county].map((city) => city.nume))]
            .sort()
            .map((city) => ({
              name: city,
              label: city,
            }))
        : [],
    [citiesByCounty, county]
  );

  const onSubmit = async (values: OrganizationFormData) => {
    const data = await createNgo(
      {
        ...values,
        domains: values.domains?.map((d) => +d.value),
        username: values.email,
      },
      {
        onError: (error) => {
          const errorResponse = (error as any)?.response?.data?.error;
          const message = errorResponse?.message;

          if (message) {
            if (
              errorResponse.details?.errors?.length > 0 &&
              errorResponse.details?.errors?.find(
                ({ path }: { path: string }) =>
                  path.includes("ongIdentificationNumber")
              )
            ) {
              form.setError("ongIdentificationNumber", {
                message: "Organizație deja înregistrată în platformă",
              });
              toast.error("Organizație deja înregistrată în platformă");
            } else if (message == "Email or Username are already taken") {
              form.setError("email", {
                message: "Acest email este deja folosit",
              });
              toast.error("Acest email este deja folosit");
            }
          } else {
            toast.error("A aparut o problema");
          }
        },
      }
    );

    if (values.avatar) {
      uploadPicture({ userId: data.user.id, file: values.avatar });
    }

    navigate({
      to: "/users/$userId",
      params: { userId: data.user.id.toString() },
    });
  };

  return (
    <div>
      <Section>
        <div className={"space-y-2"}>
          <Heading level={"h2"}>Adaugă organizație</Heading>
        </div>
      </Section>
      <Section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Informații Obligatorii despre ONG
                </CardTitle>
                <CardDescription>
                  Aceste informații sunt necesare pentru înregistrarea
                  organizației
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="ongName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Numele organizației
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Introduceți numele organizației"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ongIdentificationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          CIF-ul organizației
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Introduceți CIF-ul" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="county"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Județul <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selectați județul" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {counties.map((county) => (
                              <SelectItem key={county.name} value={county.name}>
                                {county.label}
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
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Localitatea <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className="w-full"
                              disabled={!county}
                            >
                              <SelectValue placeholder="Selectați localitatea" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableCities.map((city) => (
                              <SelectItem key={city.name} value={city.name}>
                                {city.label}
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email organizație
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              className="pl-10"
                              placeholder="organizatie@example.com"
                              type="email"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Telefon organizație
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              className="pl-10"
                              placeholder="+40 123 456 789"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Parola <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <PasswordInput
                              className="pl-10"
                              placeholder="Introduceți parola"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Confirmă parola
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <PasswordInput
                              className="pl-10"
                              placeholder="Confirmați parola"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Persoana de Contact
                </CardTitle>
                <CardDescription>
                  Informații despre persoana de contact a organizației
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="contactLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nume
                          <span className="text-red-500">*</span>
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
                    name="contactFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Prenume
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Prenume" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Adresă de email
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              className="pl-10"
                              placeholder="contact@example.com"
                              type="email"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Telefon <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              className="pl-10"
                              placeholder="+40 123 456 789"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Informații Adiționale (Opționale)
                </CardTitle>
                <CardDescription>
                  Aceste informații ne ajută să cunoaștem mai bine organizația
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <FormField
                    control={form.control}
                    name="domains"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Domenii de activitate</FormLabel>
                        <MultiSelector
                          onValuesChange={field.onChange}
                          values={field.value}
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="Alege domenii" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList>
                              {domains.map((domain) => (
                                <MultiSelectorItem
                                  key={domain.name}
                                  value={domain.id.toString()}
                                  label={domain.name}
                                >
                                  <span>{domain.name}</span>
                                </MultiSelectorItem>
                              ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website organizație</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              className="pl-10"
                              placeholder="https://www.organizatia.ro"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cuvinte cheie despre activitate</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="educație, copii, mediu..."
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
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo ONG</FormLabel>
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrierea activității organizației</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descrieți pe scurt activitatea organizației..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                className="sm:w-auto bg-transparent"
                asChild
              >
                <Link to="/users">Renunță</Link>
              </Button>

              <Button type="submit" className="sm:w-auto">
                Salvează organizația
              </Button>
            </div>
          </form>
        </Form>
      </Section>
    </div>
  );
};
export default CreateUser;
