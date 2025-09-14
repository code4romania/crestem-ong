import { queryClient } from "@/lib/query";
import Register from "@/pages/public/Register";
import { domainsQueryOptions } from "@/services/domains.queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register")({
  loader: () => queryClient.ensureQueryData(domainsQueryOptions),
  component: Register,
});
