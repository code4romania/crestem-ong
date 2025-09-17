import FullScreenLoader from "@/components/FullScreenLoader";
import getUserType from "@/lib/userType";
import Program from "@/pages/admin/Program";
import { useAppSelector } from "@/redux/store";
import { getProgramQueryOptions } from "@/services/programs.queries";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/programs/$programId")({
  loader: async ({ context: { queryClient }, params: { programId } }) =>
    queryClient.ensureQueryData(getProgramQueryOptions(programId)),
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? <Program /> : <Navigate to="/" />;
}
