/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GMAIL_USER: string;
  readonly GMAIL_APP_PASSWORD: string;
  readonly CONTACT_EMAIL_TO: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
