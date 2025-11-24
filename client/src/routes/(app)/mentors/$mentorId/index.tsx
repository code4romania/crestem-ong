import LayoutApp from "@/components/LayoutApp";
import { useAuth } from "@/contexts/auth";
import UserDetails from "@/pages/admin/UserDetails";
import MentorDetails from "@/pages/MentorDetails";
import {
  getUserDetailsQueryOptions,
  useSuspenseGetUserDetails,
} from "@/services/user.queries";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/mentors/$mentorId/")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  loader: async ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(getUserDetailsQueryOptions(params.mentorId)),
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  const { mentorId } = Route.useParams();
  const { data: user } = useSuspenseGetUserDetails(mentorId);

  return userRole === "fdsc" ? (
    <LayoutApp>
      <UserDetails userDetails={user} />
    </LayoutApp>
  ) : userRole === "authenticated" ? (
    <LayoutApp>
      <MentorDetails mentor={user} />
    </LayoutApp>
  ) : (
    <Navigate to="/" />
  );
}
