import ConfirmEmail from "@/pages/public/ConfirmEmail";
import { createFileRoute } from "@tanstack/react-router";

type ConfirmEmailSearch = {
  registrationToken: string;
};

export const Route = createFileRoute("/(auth)/confirm-email")({
  validateSearch: (search: Record<string, unknown>): ConfirmEmailSearch => {
    // validate and parse the search params into a typed state
    return {
      registrationToken: (search.registrationToken as string) || "",
    };
  },
  component: ConfirmEmail,
});
