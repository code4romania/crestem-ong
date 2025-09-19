import FullScreenLoader from "@/components/FullScreenLoader";
import getUserType from "@/lib/userType";
import ReportsList from "@/pages/ReportsList";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/reports/")({
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? <ReportsList /> : <Navigate to="/" />;
}
