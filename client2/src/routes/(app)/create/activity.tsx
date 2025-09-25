import { useAuth } from "@/contexts/auth";
import NewActivity from "@/pages/mentor/NewActivity";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/activity")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "mentor" ? <NewActivity /> : <Navigate to="/" />;
}
