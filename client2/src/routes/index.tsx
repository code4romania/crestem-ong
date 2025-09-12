import LayoutApp from "@/components/LayoutApp";
import getUserType from "@/lib/userType";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import HomeMentor from "@/pages/mentor/Home";
import { useAppSelector } from "@/redux/store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return (
    <LayoutApp>
      {userType === "fdsc" ? (
        <Dashboard />
      ) : userType === "authenticated" ? (
        <Home />
      ) : userType === "mentor" ? (
        <HomeMentor />
      ) : (
        <Home />
      )}
    </LayoutApp>
  );
}
