import { useAuth } from "@/contexts/auth";
import FDSCProfile from "@/pages/admin/Profile";
import MentorProfile from "@/pages/mentor/Profile";
import Profile from "@/pages/Profile";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile/")({
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

  return userRole === "fdsc" ? (
    <FDSCProfile />
  ) : userRole === "authenticated" ? (
    <Profile />
  ) : userRole === "mentor" ? (
    <MentorProfile />
  ) : (
    <Navigate to="/" />
  );
}
