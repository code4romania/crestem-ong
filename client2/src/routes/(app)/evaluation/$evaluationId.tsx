import FullScreenLoader from "@/components/FullScreenLoader";
import Evaluation from "@/pages/Evaluation";
import { getEvaluationQueryOptions } from "@/services/evaluation.queries";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
const routeSchema = z.object({
  email: z.email().optional().default(""),
});
export const Route = createFileRoute("/(app)/evaluation/$evaluationId")({
  validateSearch: zodValidator(routeSchema),
  loaderDeps: ({ search: { email } }) => ({ email }),
  loader: async ({
    context: { queryClient },
    params: { evaluationId },
    deps: { email },
  }) =>
    queryClient.ensureQueryData(getEvaluationQueryOptions(evaluationId, email)),
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  return <Evaluation />;
}
