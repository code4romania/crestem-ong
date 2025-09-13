import getUserType from "@/lib/userType";
import CreateUser from "@/pages/admin/CreateUser";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? <CreateUser /> : <Navigate to="/" />;
}
