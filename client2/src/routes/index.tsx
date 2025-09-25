import FullScreenLoader from "@/components/FullScreenLoader";
import LayoutApp from "@/components/LayoutApp";
import getUserType from "@/lib/userType";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import HomeMentor from "@/pages/mentor/Home";
import UnauthenticatedHome from "@/pages/UnauthenticatedHome";
import { useGetMe } from "@/services/user.queries";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: FullScreenLoader,
});

function RouteComponent() {
  const { userRole } = useAuth();
  console.log(userType);
  return (
    <LayoutApp>
      {userRole === "fdsc" ? (
        <Suspense fallback={<FullScreenLoader />}>
          <Dashboard />
        </Suspense>
      ) : userRole === "authenticated" ? (
        <Home />
      ) : userRole === "mentor" ? (
        <HomeMentor />
      ) : (
        <UnauthenticatedHome />
      )}
    </LayoutApp>
  );
}
