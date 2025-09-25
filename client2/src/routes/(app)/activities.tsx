import LayoutApp from "@/components/LayoutApp";
import { useAuth } from "@/contexts/auth";
import Activities from "@/pages/mentor/Activities";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/activities")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();

  return userRole === "mentor" ? (
    <LayoutApp>
      <Activities />
    </LayoutApp>
  ) : (
    <Navigate to="/" />
  );
}
