import LayoutApp from "@/components/LayoutApp";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: LayoutApp,
});
