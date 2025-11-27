import FullScreenLoader from "@/components/FullScreenLoader";
import LayoutApp from "@/components/LayoutApp";
import { useAuth } from "@/contexts/auth";
import UserDetails from "@/pages/admin/UserDetails";
import MentorDetails from "@/pages/MentorDetails";
import {
  getUserDetailsQueryOptions,
  useGetUserDetails,
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
  const { data: user, isLoading } = useGetUserDetails(mentorId);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!user) {
    return <Navigate to="/mentors" />;
  }

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
