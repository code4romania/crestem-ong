import LayoutEvaluation from "@/components/LayoutEvaluation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/evaluation")({
  component: LayoutEvaluation,
});
