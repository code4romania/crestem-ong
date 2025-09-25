import { useAuth } from "@/contexts/auth";
import NewReport from "@/pages/NewReport";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/report")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "authenticated" ? <NewReport /> : <Navigate to="/" />;
}
