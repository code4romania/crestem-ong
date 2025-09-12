/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthMiddleware from "./components/AuthMiddleware";
import Router from "./router";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/globals.css";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <AuthMiddleware>
          <Router />
        </AuthMiddleware>
        <ScrollToTop />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}
