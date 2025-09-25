import { useAuth } from "@/contexts/auth";
import OngEditProfile from "@/pages/authenticated/EditProfile";
import MentorEditProfile from "@/pages/mentor/EditProfile";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "authenticated" ? (
    <OngEditProfile />
  ) : userRole === "mentor" ? (
    <MentorEditProfile />
  ) : (
    <Navigate to="/" />
  );
}
