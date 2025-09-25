import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/contexts/auth";
import AdminReport from "@/pages/admin/Report";
import Report from "@/pages/authenticated/Report";
import MentorReport from "@/pages/mentor/Report";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/reports/$reportId")({
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? (
    <AdminReport />
  ) : userRole === "authenticated" ? (
    <Report />
  ) : userRole === "mentor" ? (
    <MentorReport />
  ) : (
    <Navigate to="/" />
  );
}
