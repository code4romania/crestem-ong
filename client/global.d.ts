/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import * as React from "react";
import "vite/client";

interface Window {
  dataLayer: unknown[];
}

interface ImportMetaEnv {
  readonly VITE_SERVER_ENDPOINT: string;
  readonly NODE_ENV: string;
}

declare module "relay-runtime" {
  interface PayloadError {
    errors?: Record<string, string[] | undefined>;
  }
}

declare module "*.css";

declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}
