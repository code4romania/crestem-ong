import getUserType from "@/lib/userType";
import CreateMentor from "@/pages/admin/CreateMentor";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/mentor")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? <CreateMentor /> : <Navigate to="/" />;
}
