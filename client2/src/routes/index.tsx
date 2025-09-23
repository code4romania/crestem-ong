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
  const { data: user } = useGetMe();
  const userType = getUserType(user);
  console.log(userType);
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
