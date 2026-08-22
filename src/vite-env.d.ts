/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Destination inbox for contact form submissions (configured via .env.local). */
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
