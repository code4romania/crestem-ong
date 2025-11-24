import FullScreenLoader from "@/components/FullScreenLoader";
import { useAuth } from "@/contexts/auth";
import ReportDetailsPage from "@/pages/ReportDetails";
import Report from "@/pages/authenticated/Report";

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
    <ReportDetailsPage />
  ) : userRole === "authenticated" ? (
    <Report />
  ) : userRole === "mentor" ? (
    <ReportDetailsPage />
  ) : (
    <Navigate to="/" />
  );
}
