import Heading from "@/components/Heading";
import Section from "@/components/Section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUserDomains } from "@/services/user.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { LogoUpload } from "@/components/PictureSelect";
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

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth";
import { citiesByCounty } from "@/lib/orase-dupa-judet";
import { useListDomains } from "@/services/domains.queries";
import {
  updateNgoMutation,
  useUploadPictureMutation,
} from "@/services/user.mutations";
import {
  Building2,
  Globe,
  Link as LinkIcon,
  Mail,
  Phone,
  User,
} from "lucide-react";
import type { FinalDomainModel } from "@/services/api/types";

const ongProfileSchema = z.object({
  id: z.number(),
  ongName: z.string().min(1, "Numele organizatiei este obligatoriu"),
  ongIdentificationNumber: z
    .string()
    .min(1, "Numarul de identifiare este obligatoriu"),
  county: z.string().min(1, "Judetul este obligatoriu"),
  city: z.string().min(1, "Orasul este obligatoriu"),
  email: z
    .email("Adresa de email este invalidă")
    .min(1, "Adresa de email este obligatorie"),
  phone: z.string().min(1, "Telefonul este obligatoriu"),
  avatar: z.custom<File>(),
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
  contactEmail: z
    .email("Adresa de email este invalida")
    .optional()
    .or(z.literal("")),
  contactPhone: z.string(),
  accountFacebook: z.string().optional(),
  accountTwitter: z.string().optional(),
  accountTiktok: z.string().optional(),
  accountInstagram: z.string().optional(),
  accountLinkedin: z.string().optional(),
});

export type OngProfileInput = z.infer<typeof ongProfileSchema>;

const domainMapper = (userDomains: FinalDomainModel[]) =>
  userDomains
    ? userDomains.map((d) => ({ value: d.id.toString(), label: d.name }))
    : [];

const OngEditProfile = () => {
  const { user } = useAuth();

  const { data: ongDomains } = useGetUserDomains(domainMapper);
  const { data: domains } = useListDomains();

  const navigate = useNavigate();

  const { mutateAsync: updateUser, isPending: isUpdatePending } =
    updateNgoMutation();
  const { mutateAsync: uploadAvatar, isPending: isUploadPending } =
    useUploadPictureMutation();

  const form = useForm<OngProfileInput>({
    resolver: zodResolver(ongProfileSchema),
    defaultValues: {
      ...user,
      domains: ongDomains,
      accountFacebook: user?.accountFacebook || "",
      accountTwitter: user?.accountTwitter || "",
      accountTiktok: user?.accountTiktok || "",
      accountInstagram: user?.accountInstagram || "",
      accountLinkedin: user?.accountLinkedin || "",
      avatar: undefined,
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

  const onSubmit: SubmitHandler<OngProfileInput> = async (data) => {
    await updateUser(
      {
        ...data,
        domains: data.domains?.map((d) => +d.value),
      },
      {
        onError: (error) => {
          const data = error as any;
          toast.error(data.error.message);
        },
      }
    );

    if (data.avatar) {
      await uploadAvatar({ userId: data.id, file: data.avatar });
    }

    navigate({ to: "/profile" });
    toast.success("Salvat");
  };

  return (
    <div>
      <Section>
        <div className={"space-y-2"}>
          <Heading level={"h2"}>Editeaza profilul</Heading>
        </div>
      </Section>
      <Section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Required Organization Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Informații obligatorii despre ONG
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
                          <Input placeholder="Numele organizației" {...field} />
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
                          <Input placeholder="CIF organizației" {...field} />
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
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email organizație
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@organizatie.ro"
                            {...field}
                          />
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
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Telefon organizație
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+40 XXX XXX XXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Optional Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Informații adiționale (opționale)
                </CardTitle>
                <CardDescription>
                  Aceste informații ne ajută să înțelegem mai bine organizația
                  ta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                            {domains?.map((domain) => (
                              <MultiSelectorItem
                                key={domain.attributes.name}
                                value={domain.id.toString()}
                                label={domain.attributes.name}
                              >
                                <span>{domain.attributes.name}</span>
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
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website organizație</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://organizatia-mea.ro"
                          {...field}
                        />
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
                          placeholder="educație, mediu, sănătate..."
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
                      <FormLabel>Descrie activitatea organizației</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descrie pe scurt activitatea organizației tale..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        Numărul maxim de caractere: 1000
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo ONG</FormLabel>
                      <FormControl>
                        <LogoUpload
                          currentLogo={user?.avatar?.formats?.thumbnail?.url}
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

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Persoana de contact
                </CardTitle>
                <CardDescription>
                  Informații despre persoana responsabilă de comunicare
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="contactLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nume</FormLabel>
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
                        <FormLabel>Prenume</FormLabel>
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
                        <FormLabel>Adresă de email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="contact@email.ro"
                            {...field}
                          />
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
                        <FormLabel>Telefon</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+40 XXX XXX XXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Link-uri către social media
                </CardTitle>
                <CardDescription>
                  Link-urile oficiale pentru comunicare
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="accountFacebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://facebook.com/organizatia"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountInstagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/organizatia"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountTwitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter/X</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://twitter.com/organizatia"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountLinkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/company/organizatia"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountTiktok"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TikTok</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://tiktok.com/@organizatia"
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
export default OngEditProfile;
