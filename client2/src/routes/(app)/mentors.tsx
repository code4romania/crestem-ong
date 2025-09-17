import LayoutApp from "@/components/LayoutApp";
import LayoutDashboard from "@/components/LayoutDashboard";
import getUserType from "@/lib/userType";
import AuthenticatedMentorsList from "@/pages/authenticated/MentorsList";
import Mentors from "@/pages/Mentors";
import { useAppSelector } from "@/redux/store";
import { listMentorsQueryOptions } from "@/services/mentors.queries";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/mentors")({
  loader: async ({ context: { queryClient } }) =>
    queryClient.prefetchQuery(listMentorsQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? (
    <LayoutDashboard>
      <Mentors />
    </LayoutDashboard>
  ) : userType === "authenticated" ? (
    <LayoutApp>
      <AuthenticatedMentorsList />
    </LayoutApp>
  ) : (
    <Navigate to="/" />
  );
}
