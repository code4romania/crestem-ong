import LayoutApp from "@/components/LayoutApp";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: LayoutApp,
});
