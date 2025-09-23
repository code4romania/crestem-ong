import FullScreenLoader from "@/components/FullScreenLoader";
import getUserType from "@/lib/userType";
import AdminReport from "@/pages/admin/Report";
import Report from "@/pages/authenticated/Report";
import MentorReport from "@/pages/mentor/Report";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/reports/$reportId")({
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const { data: user } = useGetMe();
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
