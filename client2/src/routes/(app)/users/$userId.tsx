import getUserType from "@/lib/userType";
import AuthenticatedMentor from "@/pages/authenticated/Mentor";
import UserReports from "@/pages/UserReports";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/users/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "fdsc" ? (
    <UserReports />
  ) : userType === "authenticated" ? (
    <AuthenticatedMentor />
  ) : (
    <Navigate to="/" />
  );
}
