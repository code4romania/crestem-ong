import getUserType from "@/lib/userType";
import CreateMentor from "@/pages/admin/CreateMentor";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/mentor")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "fdsc" ? <CreateMentor /> : <Navigate to="/" />;
}
