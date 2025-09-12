/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import react from "@vitejs/plugin-react-swc";
import { URL, fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineProject } from "vitest/config";

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
    cacheDir: fileURLToPath(new URL("../../.cache/vite-app", import.meta.url)),

    build: {
      rollupOptions: {
        output: {
          assetFileNames: "_app/assets/[name]-[hash][extname]",
          chunkFileNames: "_app/assets/[name]-[hash].js",
          entryFileNames: "_app/assets/[name]-[hash].js",
          manualChunks: {
            react: ["react", "react-dom"],
            ui: [
              "@radix-ui/react-slot",
              "class-variance-authority",
              "clsx",
              "tailwind-merge",
            ],
          },
        },
      },
    },

    resolve: {
      conditions: ["module", "browser", "development|production"],
    },

    css: {
      postcss: "./postcss.config.js",
    },

    plugins: [
      tsconfigPaths(),
      // https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react-swc
      react(),
    ],

    test: {
      ...{ cache: { dir: "../../.cache/vitest" } },
      environment: "happy-dom",
    },
  };
});
