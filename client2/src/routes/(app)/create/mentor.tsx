import { useAuth } from "@/contexts/auth";
import CreateMentor from "@/pages/admin/CreateMentor";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/mentor")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? <CreateMentor /> : <Navigate to="/" />;
}
