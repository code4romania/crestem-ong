import LayoutApp from "@/components/LayoutApp";
import LayoutDashboard from "@/components/LayoutDashboard";
import { useAuth } from "@/contexts/auth";

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/users")({
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
  return userRole === "fdsc" ? <LayoutDashboard /> : <LayoutApp />;
}
