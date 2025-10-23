import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/contexts/auth";
import NgosList from "@/pages/admin/NgosList";
import MenteesList from "@/pages/mentor/MenteesList";

import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
const filtersSchema = z.object({
  search: z.string().optional(),
  createdAtDateFrom: z.iso.date().optional().catch(""),
  createdAtDateUntil: z.iso.date().optional(),
  latestEvaluationDateFrom: z.iso.date().optional(),
  latestEvaluationDateUntil: z.iso.date().optional(),
  county: z.array(z.string()).optional(),
  locality: z.array(z.string()).optional(),
});

export const Route = createFileRoute("/(app)/users/")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  validateSearch: zodValidator(filtersSchema),

  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? (
    <NgosList />
  ) : userRole === "mentor" ? (
    <MenteesList />
  ) : (
    <Navigate to="/" />
  );
}
