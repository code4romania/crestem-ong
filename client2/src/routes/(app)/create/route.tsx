import LayoutApp from "@/components/LayoutApp";
import LayoutDashboard from "@/components/LayoutDashboard";
import { useAuth } from "@/contexts/auth";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? <LayoutDashboard /> : <LayoutApp />;
}
