import { useAuth } from "@/contexts/auth";
import NewActivity from "@/pages/mentor/NewActivity";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/activity")({
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
  return userRole === "mentor" ? <NewActivity /> : <Navigate to="/" />;
}
