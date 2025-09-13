import EmailSent from "@/pages/public/EmailSent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/email-sent")({
  component: EmailSent,
});
