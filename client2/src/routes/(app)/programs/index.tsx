import FullScreenLoader from "@/components/FullScreenLoader";
import ProgramsList from "@/pages/admin/ProgramsList";

import { useAuth } from "@/contexts/auth";
import { listProgramsQueryOptions } from "@/services/programs.queries";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const filtersSchema = z.object({
  search: z.string().default(""),
  status: z
    .array(z.enum(["ongoing", "finished"]))
    .optional()
    .catch([]),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
});

export const Route = createFileRoute("/(app)/programs/")({
  validateSearch: zodValidator(filtersSchema),
  loader: async ({ context: { queryClient } }) =>
    queryClient.prefetchQuery(listProgramsQueryOptions()),
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? <ProgramsList /> : <Navigate to="/" />;
}
