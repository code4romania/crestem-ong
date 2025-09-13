import ResetPassword from "@/pages/public/ResetPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/reset-password")({
  component: ResetPassword,
});

function RouteComponent() {
  return <div>Hello "/(auth)/reset-password"!</div>;
}
