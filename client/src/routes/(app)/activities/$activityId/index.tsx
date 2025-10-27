import LayoutApp from "@/components/LayoutApp";
import { useAuth } from "@/contexts/auth";
import ActivityDetails from "@/pages/admin/ActivityDetails";
import { getActivityByIdQueryOptions } from "@/services/activities.queries";

import {
  createFileRoute,
  Navigate,
  redirect,
  stripSearchParams,
} from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/(app)/activities/$activityId/")({
  validateSearch: z.object({
    returnTo: z.string().optional(),
  }),
  search: {
    middlewares: [
      stripSearchParams({
        returnTo: undefined,
      }),
    ],
  },
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

  return userRole === "fdsc" || userRole === "mentor" ? (
    <LayoutApp>
      <ActivityDetails />
    </LayoutApp>
  ) : (
    <Navigate to="/" />
  );
}
