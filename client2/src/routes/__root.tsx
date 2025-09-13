import ScrollToTop from "@/components/ScrollToTop";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRouteWithContext<{
  // auth: typeof auth;
  queryClient: QueryClient;
}>()({
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
