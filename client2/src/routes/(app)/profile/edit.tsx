import getUserType from "@/lib/userType";
import OngEditProfile from "@/pages/authenticated/EditProfile";
import MentorEditProfile from "@/pages/mentor/EditProfile";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "authenticated" ? (
    <OngEditProfile />
  ) : userType === "mentor" ? (
    <MentorEditProfile />
  ) : (
    <Navigate to="/" />
  );
}
