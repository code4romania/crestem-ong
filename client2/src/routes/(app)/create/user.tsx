import { useAuth } from "@/contexts/auth";
import CreateUser from "@/pages/admin/CreateUser";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? <CreateUser /> : <Navigate to="/" />;
}
