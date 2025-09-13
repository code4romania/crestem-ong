import LayoutApp from "@/components/LayoutApp";
import getUserType from "@/lib/userType";
import Activities from "@/pages/mentor/Activities";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/activities")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "mentor" ? (
    <LayoutApp>
      <Activities />
    </LayoutApp>
  ) : (
    <Navigate to="/" />
  );
}
