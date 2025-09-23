import getUserType from "@/lib/userType";
import NewActivity from "@/pages/mentor/NewActivity";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/activity")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "mentor" ? <NewActivity /> : <Navigate to="/" />;
}
