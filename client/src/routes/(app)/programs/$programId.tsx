import FullScreenLoader from "@/components/FullScreenLoader";
import Program from "@/pages/admin/Program";

import { useAuth } from "@/contexts/auth";
import { getProgramQueryOptions } from "@/services/programs.queries";
import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/programs/$programId")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  loader: async ({ context: { queryClient }, params: { programId } }) =>
    queryClient.ensureQueryData(getProgramQueryOptions(programId)),
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? <Program /> : <Navigate to="/" />;
}
