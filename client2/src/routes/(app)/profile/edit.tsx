import getUserType from "@/lib/userType";
import OngEditProfile from "@/pages/authenticated/EditProfile";
import MentorEditProfile from "@/pages/mentor/EditProfile";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "authenticated" ? (
    <OngEditProfile />
  ) : userType === "mentor" ? (
    <MentorEditProfile />
  ) : (
    <Navigate to="/" />
  );
}
