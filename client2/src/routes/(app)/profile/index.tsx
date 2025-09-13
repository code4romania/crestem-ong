import getUserType from "@/lib/userType";
import MentorProfile from "@/pages/mentor/Profile";
import Profile from "@/pages/Profile";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
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
