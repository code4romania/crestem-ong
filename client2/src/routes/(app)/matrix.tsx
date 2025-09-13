import LayoutApp from "@/components/LayoutApp";
import Matrix from "@/components/Matrix";
import getUserType from "@/lib/userType";
import AuthenticatedMatrix from "@/pages/authenticated/Matrix";
import { useAppSelector } from "@/redux/store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/matrix")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return (
    <LayoutApp>
      {userType === "authenticated" ? <AuthenticatedMatrix /> : <Matrix />}
    </LayoutApp>
  );
}
