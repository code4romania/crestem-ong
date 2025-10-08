import { useAuth } from "@/contexts/auth";
import UserDetails from "@/pages/admin/UserDetails";
import MentorDetails from "@/pages/MentorDetails";
import {
  getUserDetailsQueryOptions,
  useSuspenseGetUserDetails,
} from "@/services/user.queries";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/users/$userId")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  loader: async ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(getUserDetailsQueryOptions(params.userId)),
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  const { userId } = Route.useParams();
  const { data: userDetails } = useSuspenseGetUserDetails(userId);

  return userRole === "fdsc" ? (
    <UserDetails userDetails={userDetails} />
  ) : userRole === "authenticated" ? (
    <MentorDetails mentor={userDetails} />
  ) : (
    <Navigate to="/" />
  );
}
