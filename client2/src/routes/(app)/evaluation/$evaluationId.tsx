import Evaluation from "@/pages/Evaluation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/evaluation/$evaluationId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Evaluation />;
}
