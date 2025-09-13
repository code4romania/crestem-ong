import LayoutDashboard from "@/components/LayoutDashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/programs")({
  component: LayoutDashboard,
});
