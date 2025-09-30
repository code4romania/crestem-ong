import LayoutDashboard from "@/components/LayoutDashboard";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/programs")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: LayoutDashboard,
});
