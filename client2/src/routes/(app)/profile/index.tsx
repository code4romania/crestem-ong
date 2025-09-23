import getUserType from "@/lib/userType";
import MentorProfile from "@/pages/mentor/Profile";
import Profile from "@/pages/Profile";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "fdsc" ? (
    <Profile />
  ) : userType === "authenticated" ? (
    <Profile />
  ) : userType === "mentor" ? (
    <MentorProfile />
  ) : (
    <Navigate to="/" />
  );
}
