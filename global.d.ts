declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production';
      readonly PORT?: number;
    }
  }
}

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    smtpHost?: string;
    smtpPort?: number;
    smtpUser?: string;
    smtpPassword?: string;
  }
}

export {};
