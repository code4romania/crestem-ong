import getUserType from "@/lib/userType";
import NewReport from "@/pages/NewReport";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/report")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "authenticated" ? <NewReport /> : <Navigate to="/" />;
}
