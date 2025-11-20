/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_ENDPOINT: string;
  readonly NODE_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
