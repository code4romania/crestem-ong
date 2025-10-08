import { useAuth } from "@/contexts/auth";
import EditMentor from "@/pages/admin/EditMentor";
import { getUserDetailsQueryOptions } from "@/services/user.queries";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/users/$userId/edit")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  loader: async ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(getUserDetailsQueryOptions(params.userId)),
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? <EditMentor /> : <Navigate to="/" />;
}
