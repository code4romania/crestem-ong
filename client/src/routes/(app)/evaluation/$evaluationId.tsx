import FullScreenLoader from "@/components/FullScreenLoader";
import Evaluation from "@/pages/Evaluation";
import ExpiredEvaluation from "@/pages/Evaluation/ExpiredEvaluation";
import { getEvaluationQueryOptions } from "@/services/evaluation.queries";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";

import z from "zod";

const routeSchema = z.object({
  email: z.email().optional().default(""),
});
export const Route = createFileRoute("/(app)/evaluation/$evaluationId")({
  validateSearch: routeSchema,
  loaderDeps: ({ search: { email } }) => ({ email }),
  loader: async ({
    context: { queryClient },
    params: { evaluationId },
    deps: { email },
  }) =>
    queryClient.ensureQueryData(getEvaluationQueryOptions(evaluationId, email)),
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
  onError: (error) => console.log(error),
  errorComponent: false,
});

function RouteComponent() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error }) => {
            if ((error as any)?.status === 403) {
              return <Navigate to="/" />;
            }

            console.log(error);
            if ((error as any)?.status === 401) {
              return <ExpiredEvaluation error={error} />;
            }
          }}
        >
          <Evaluation />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
