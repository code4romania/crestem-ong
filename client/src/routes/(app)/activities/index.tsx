import LayoutApp from "@/components/LayoutApp";
import { useAuth } from "@/contexts/auth";
import Activities from "@/pages/mentor/Activities";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/activities/")({
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

  return userRole === "mentor" ? (
    <LayoutApp>
      <Activities />
    </LayoutApp>
  ) : (
    <Navigate to="/" />
  );
}
