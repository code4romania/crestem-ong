import { useAuth } from "@/contexts/auth";
import AuthenticatedMentor from "@/pages/authenticated/Mentor";
import UserReports from "@/pages/UserReports";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/users/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? (
    <UserReports />
  ) : userRole === "authenticated" ? (
    <AuthenticatedMentor />
  ) : (
    <Navigate to="/" />
  );
}
