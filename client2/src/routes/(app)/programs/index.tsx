import getUserType from "@/lib/userType";
import ProgramsList from "@/pages/admin/ProgramsList";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/programs/")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? <ProgramsList /> : <Navigate to="/" />;
}
