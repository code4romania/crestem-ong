import ResetPassword from "@/pages/public/ResetPassword";
import { createFileRoute } from "@tanstack/react-router";

type ResetPasswordSearch = {
  code: string;
};
export const Route = createFileRoute("/(auth)/reset-password")({
  validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => {
    // validate and parse the search params into a typed state
    return {
      code: (search.code as string) || "",
    };
  },
  component: ResetPassword,
});
