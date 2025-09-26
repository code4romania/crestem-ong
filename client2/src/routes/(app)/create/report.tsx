import { useAuth } from "@/contexts/auth";
import NewReport from "@/pages/NewReport";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/report")({
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
  return userRole === "authenticated" ? <NewReport /> : <Navigate to="/" />;
}
