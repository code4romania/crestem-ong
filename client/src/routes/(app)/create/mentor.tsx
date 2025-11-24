import { useAuth } from "@/contexts/auth";
import CreateMentor from "@/pages/admin/CreateMentor";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/mentor")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? <CreateMentor /> : <Navigate to="/" />;
}
