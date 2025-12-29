/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DB: D1Database;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
