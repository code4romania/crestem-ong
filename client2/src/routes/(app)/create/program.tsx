import getUserType from "@/lib/userType";
import CreateProgram from "@/pages/admin/CreateProgram";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/program")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "fdsc" ? <CreateProgram /> : <Navigate to="/" />;
}
