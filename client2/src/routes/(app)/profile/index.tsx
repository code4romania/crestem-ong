import { useAuth } from "@/contexts/auth";
import MentorProfile from "@/pages/mentor/Profile";
import Profile from "@/pages/Profile";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? (
    <Profile />
  ) : userRole === "authenticated" ? (
    <Profile />
  ) : userRole === "mentor" ? (
    <MentorProfile />
  ) : (
    <Navigate to="/" />
  );
}
