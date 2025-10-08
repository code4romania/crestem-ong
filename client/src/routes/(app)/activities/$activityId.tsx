import LayoutApp from "@/components/LayoutApp";
import { useAuth } from "@/contexts/auth";
import ActivityDetails from "@/pages/admin/ActivityDetails";
import { getActivityByIdQueryOptions } from "@/services/activities.queries";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/activities/$activityId")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  loader: ({ params, context: { queryClient } }) => {
    queryClient.ensureQueryData(getActivityByIdQueryOptions(params.activityId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();

  return userRole === "fdsc" ? (
    <LayoutApp>
      <ActivityDetails />
    </LayoutApp>
  ) : (
    <Navigate to="/" />
  );
}
