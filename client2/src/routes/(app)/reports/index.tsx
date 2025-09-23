import FullScreenLoader from "@/components/FullScreenLoader";
import getUserType from "@/lib/userType";
import ReportsList from "@/pages/ReportsList";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/reports/")({
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "fdsc" ? <ReportsList /> : <Navigate to="/" />;
}
