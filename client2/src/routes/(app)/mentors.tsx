import LayoutApp from "@/components/LayoutApp";
import LayoutDashboard from "@/components/LayoutDashboard";
import getUserType from "@/lib/userType";
import AuthenticatedMentorsList from "@/pages/authenticated/MentorsList";
import Mentors from "@/pages/Mentors";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const mentorsSearchSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(100),
});

export const Route = createFileRoute("/(app)/mentors")({
  validateSearch: zodValidator(mentorsSearchSchema),
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
