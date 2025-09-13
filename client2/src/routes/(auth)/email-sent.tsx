import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/email-sent")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(auth)/email-sent"!</div>;
}
