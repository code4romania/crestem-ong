import getUserType from "@/lib/userType";
import CreateProgram from "@/pages/admin/CreateProgram";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/program")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? <CreateProgram /> : <Navigate to="/" />;
}
