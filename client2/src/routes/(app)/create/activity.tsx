import getUserType from "@/lib/userType";
import NewActivity from "@/pages/mentor/NewActivity";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/create/activity")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "mentor" ? <NewActivity /> : <Navigate to="/" />;
}
