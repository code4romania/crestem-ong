import getUserType from "@/lib/userType";
import AdminReport from "@/pages/admin/Report";
import Report from "@/pages/authenticated/Report";
import MentorReport from "@/pages/mentor/Report";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/reports/$reportId")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? (
    <AdminReport />
  ) : userType === "authenticated" ? (
    <Report />
  ) : userType === "mentor" ? (
    <MentorReport />
  ) : (
    <Navigate to="/" />
  );
}
