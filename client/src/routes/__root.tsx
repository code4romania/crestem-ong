import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import type { FinalDetailedUserModel } from "@/services/api/types";
import type { FinalRoleType } from "@/services/api/types";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface AuthState {
  isAuthenticated: boolean;
  user: FinalDetailedUserModel | null;
  userRole: FinalRoleType;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
export interface MyRouterContext {
  auth: AuthState;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

export function Root() {
  return (
    <>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
      <Toaster richColors />
      <ScrollToTop />
    </>
  );
}
