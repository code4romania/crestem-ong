import { useAuth } from "@/contexts/auth";
import OngEditProfile from "@/pages/authenticated/EditProfile";
import MentorEditProfile from "@/pages/mentor/EditProfile";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile/edit")({
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
  return userRole === "authenticated" ? (
    <OngEditProfile />
  ) : userRole === "mentor" ? (
    <MentorEditProfile />
  ) : (
    <Navigate to="/" />
  );
}
