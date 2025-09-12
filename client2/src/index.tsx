/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";
import AuthMiddleware from "./components/AuthMiddleware";
import Router from "./router";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
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
  // <StrictMode>
  //   <QueryClientProvider client={queryClient}>
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <ToastContainer position="top-center" />
  //         <AuthMiddleware>
  //           <Router />
  //         </AuthMiddleware>
  //         <ScrollToTop />
  //       </BrowserRouter>
  //     </Provider>
  //   </QueryClientProvider>
  // </StrictMode>

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthMiddleware>
          <RouterProvider router={router} />
        </AuthMiddleware>

        {import.meta.env.DEV && (
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-right"
          />
        )}
      </Provider>
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
