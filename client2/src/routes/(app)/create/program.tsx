import { useAuth } from "@/contexts/auth";
import CreateProgram from "@/pages/admin/CreateProgram";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/program")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? <CreateProgram /> : <Navigate to="/" />;
}
