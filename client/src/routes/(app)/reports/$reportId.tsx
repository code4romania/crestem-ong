import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/contexts/auth";
import AdminReport from "@/pages/admin/Report";
import Report from "@/pages/authenticated/Report";
import MentorReport from "@/pages/mentor/Report";
import { getReportByIdQueryOptions } from "@/services/reports.queries";

import {
  createFileRoute,
  Navigate,
  redirect,
  stripSearchParams,
} from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/(app)/reports/$reportId")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  validateSearch: z.object({ fromNgoId: z.number().optional() }),
  search: {
    middlewares: [
      stripSearchParams({
        fromNgoId: undefined,
      }),
    ],
  },
  loader: ({ params, context: { queryClient } }) => {
    queryClient.ensureQueryData(getReportByIdQueryOptions(params.reportId));
  },
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const { userRole } = useAuth();
  return userRole === "fdsc" ? (
    <AdminReport />
  ) : userRole === "authenticated" ? (
    <Report />
  ) : userRole === "mentor" ? (
    <MentorReport />
  ) : (
    <Navigate to="/" />
  );
}
