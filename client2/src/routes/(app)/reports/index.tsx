import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/contexts/auth";
import ReportsList from "@/pages/ReportsList";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/reports/")({
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? <ReportsList /> : <Navigate to="/" />;
}
