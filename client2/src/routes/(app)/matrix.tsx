import LayoutApp from "@/components/LayoutApp";
import Matrix from "@/components/Matrix";
import { useAuth } from "@/contexts/auth";
import AuthenticatedMatrix from "@/pages/authenticated/Matrix";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/matrix")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return (
    <LayoutApp>
      {userRole === "authenticated" ? <AuthenticatedMatrix /> : <Matrix />}
    </LayoutApp>
  );
}
