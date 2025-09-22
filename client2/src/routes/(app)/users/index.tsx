import FullScreenLoader from "@/components/FullScreenLoader";
import getUserType from "@/lib/userType";
import UsersList from "@/pages/UsersList";
import { useAppSelector } from "@/redux/store";
import { createFileRoute, Navigate } from "@tanstack/react-router";
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
  validateSearch: zodValidator(filtersSchema),
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? <UsersList /> : <Navigate to="/" />;
}
