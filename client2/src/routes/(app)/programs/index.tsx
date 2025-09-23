import FullScreenLoader from "@/components/FullScreenLoader";
import getUserType from "@/lib/userType";
import ProgramsList from "@/pages/admin/ProgramsList";
import { useGetMe } from "@/services/user.queries";

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
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "fdsc" ? <ProgramsList /> : <Navigate to="/" />;
}
