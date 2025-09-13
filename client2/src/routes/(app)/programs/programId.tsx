import getUserType from "@/lib/userType";
import Program from "@/pages/admin/Program";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/programs/programId")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? <Program /> : <Navigate to="/" />;
}
