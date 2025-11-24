import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/contexts/auth";
import ReportsList from "@/pages/admin/ReportsList";
import Evaluations from "@/pages/authenticated/Evaluations";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/reports/")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? (
    <ReportsList />
  ) : userRole === "authenticated" ? (
    <Evaluations />
  ) : (
    <Navigate to="/" />
  );
}
