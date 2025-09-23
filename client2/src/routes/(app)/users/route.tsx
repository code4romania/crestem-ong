import LayoutApp from "@/components/LayoutApp";
import LayoutDashboard from "@/components/LayoutDashboard";
import getUserType from "@/lib/userType";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/users")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "fdsc" ? <LayoutDashboard /> : <LayoutApp />;
}
