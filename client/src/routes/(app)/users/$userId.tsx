import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/contexts/auth";
import UserDetails from "@/pages/admin/UserDetails";
import MentorDetails from "@/pages/MentorDetails";
import {
  getUserDetailsQueryOptions,
  useGetUserDetails,
} from "@/services/user.queries";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/(app)/users/$userId")({
  validateSearch: z.object({
    returnToProgramId: z.string().optional(),
  }),
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
  const { data: userDetails, isLoading } = useGetUserDetails(userId);
  if (isLoading) {
    return <FullScreenLoader />;
  }
  if (!userDetails) {
    return <Navigate to="/users" />;
  }
  const { returnToProgramId } = Route.useSearch();

  return userRole === "fdsc" || userRole === "mentor" ? (
    <UserDetails
      userDetails={userDetails}
      returnToProgramId={returnToProgramId}
    />
  ) : userRole === "authenticated" ? (
    <MentorDetails mentor={userDetails} returnToProgramId={returnToProgramId} />
  ) : (
    <Navigate to="/" />
  );
}
