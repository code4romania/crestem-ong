import FullScreenLoader from "@/components/FullScreenLoader";
import LayoutApp from "@/components/LayoutApp";
import { useAuth } from "@/contexts/auth";
import FDSCHome from "@/pages/admin/Home";
import NGOHome from "@/pages/authenticated/Home";
import MentorHome from "@/pages/mentor/Home";
import Home from "@/pages/public/Home";
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
          <FDSCHome />
        </Suspense>
      ) : userRole === "authenticated" ? (
        <NGOHome />
      ) : userRole === "mentor" ? (
        <MentorHome />
      ) : (
        <Home />
      )}
    </LayoutApp>
  );
}
