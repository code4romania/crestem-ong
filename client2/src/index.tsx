/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthMiddleware from "./components/AuthMiddleware";
import "./globals.css";
import { queryClient } from "./lib/query";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: {
    // auth,
    queryClient,
  },
});

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthMiddleware>
        <RouterProvider router={router} />
      </AuthMiddleware>

      {import.meta.env.DEV && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
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
