import Register from "@/pages/public/Register";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register")({
  component: Register,
});
