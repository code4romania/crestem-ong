import getUserType from "@/lib/userType";
import CreateUser from "@/pages/admin/CreateUser";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "fdsc" ? <CreateUser /> : <Navigate to="/" />;
}
