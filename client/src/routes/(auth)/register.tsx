import { queryClient } from "@/lib/query";
import Register from "@/pages/public/Register";
import { listDomainsQueryOptions } from "@/services/domains.queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register")({
  loader: () => queryClient.ensureQueryData(listDomainsQueryOptions()),
  component: Register,
});
