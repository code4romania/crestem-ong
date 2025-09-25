/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { queryClient } from "./lib/query";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./contexts/auth";

const router = createRouter({
  routeTree,
  context: {
    // auth will be passed down from App component
    auth: {
      userRole: "public",
      user: null,
      isAuthenticated: false,
      logout: () => Promise.resolve(),
      login: (username: string, password: string) => Promise.resolve(),
    }!,
    queryClient,
  },
});

const container = document.getElementById("root");
const root = createRoot(container!);

function InnerApp() {
  const auth = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth, queryClient }} />

      {import.meta.env.DEV && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}
root.render(
  <StrictMode>
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  </StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
