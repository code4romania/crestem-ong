import LayoutApp from "@/components/LayoutApp";
import LayoutDashboard from "@/components/LayoutDashboard";
import AuthenticatedMentorsList from "@/pages/authenticated/MentorsList";
import Mentors from "@/pages/Mentors";

import { useAuth } from "@/contexts/auth";
import { listMentorsQueryOptions } from "@/services/mentors.queries";
import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/mentors/")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  loader: async ({ context: { queryClient } }) =>
    queryClient.prefetchQuery(listMentorsQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? (
    <LayoutDashboard>
      <Mentors />
    </LayoutDashboard>
  ) : userRole === "authenticated" ? (
    <LayoutApp>
      <AuthenticatedMentorsList />
    </LayoutApp>
  ) : (
    <Navigate to="/" />
  );
}
