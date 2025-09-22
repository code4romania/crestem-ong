import FullScreenLoader from "@/components/FullScreenLoader";
import LayoutApp from "@/components/LayoutApp";
import getUserType from "@/lib/userType";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import HomeMentor from "@/pages/mentor/Home";
import UnauthenticatedHome from "@/pages/UnauthenticatedHome";
import { useAppSelector } from "@/redux/store";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: FullScreenLoader,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return (
    <LayoutApp>
      {userType === "fdsc" ? (
        <Suspense fallback={<FullScreenLoader />}>
          <Dashboard />
        </Suspense>
      ) : userType === "authenticated" ? (
        <Home />
      ) : userType === "mentor" ? (
        <HomeMentor />
      ) : (
        <UnauthenticatedHome />
      )}
    </LayoutApp>
  );
}
