import LayoutApp from "@/components/LayoutApp";
import Matrix from "@/components/Matrix";
import getUserType from "@/lib/userType";
import AuthenticatedMatrix from "@/pages/authenticated/Matrix";
import { useGetMe } from "@/services/user.queries";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/matrix")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return (
    <LayoutApp>
      {userType === "authenticated" ? <AuthenticatedMatrix /> : <Matrix />}
    </LayoutApp>
  );
}
