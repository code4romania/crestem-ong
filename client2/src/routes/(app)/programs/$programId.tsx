import FullScreenLoader from "@/components/FullScreenLoader";
import getUserType from "@/lib/userType";
import Program from "@/pages/admin/Program";
import { useGetMe } from "@/services/user.queries";

import { getProgramQueryOptions } from "@/services/programs.queries";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/programs/$programId")({
  loader: async ({ context: { queryClient }, params: { programId } }) =>
    queryClient.ensureQueryData(getProgramQueryOptions(programId)),
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const { data: user } = useGetMe();
  const userType = getUserType(user);

  return userType === "fdsc" ? <Program /> : <Navigate to="/" />;
}
