/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { URL, fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineProject } from "vitest/config";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

const publicEnvVars = ["VITE_SERVER_ENDPOINT", "NODE_ENV"];

/**
 * Vite configuration.
 * https://vitejs.dev/config/
 */
export default defineProject(({ mode }) => {
  const envDir = fileURLToPath(new URL("./", import.meta.url));
  const env = loadEnv(mode, envDir, "");

  publicEnvVars.forEach((key) => {
    if (!env[key]) throw new Error(`Missing environment variable: ${key}`);
    process.env[`VITE_${key}`] = env[key];
  });

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    css: {
      postcss: "./src/postcss.config.js",
    },

    plugins: [
      tsconfigPaths(),
      tanstackRouter({
        autoCodeSplitting: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any,
      // https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react-swc
      react(),
      tailwindcss(),
    ],

    server: {
      host: true, // allows access via LAN/Docker
      strictPort: false,
      hmr: {
        protocol: "ws", // or "wss" if using HTTPS
        host: "localhost", // change to your machine IP if accessed remotely
      },
    },
  };
});
