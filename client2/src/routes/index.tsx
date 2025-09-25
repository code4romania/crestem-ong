import FullScreenLoader from "@/components/FullScreenLoader";
import LayoutApp from "@/components/LayoutApp";
import { useAuth } from "@/contexts/auth";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import HomeMentor from "@/pages/mentor/Home";
import UnauthenticatedHome from "@/pages/UnauthenticatedHome";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: FullScreenLoader,
});

function RouteComponent() {
  const { userRole } = useAuth();
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
