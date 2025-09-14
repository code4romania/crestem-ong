import Confirm from "@/components/Confirm";
import SetPassword from "@/pages/public/ChangePassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/confirm-email")({
  component: SetPassword,
});
