import getUserType from "@/lib/userType";
import NewReport from "@/pages/NewReport";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/report")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "authenticated" ? <NewReport /> : <Navigate to="/" />;
}
