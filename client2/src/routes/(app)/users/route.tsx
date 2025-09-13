import LayoutApp from "@/components/LayoutApp";
import LayoutDashboard from "@/components/LayoutDashboard";
import getUserType from "@/lib/userType";
import { useAppSelector } from "@/redux/store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/users")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? <LayoutDashboard /> : <LayoutApp />;
}
