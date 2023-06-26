import { Manifest } from 'vue-bundle-renderer';

const developmentOrigin = `http://localhost:${process.env.PORT || 3000}`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-security',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-svgo',
    '@nuxtjs/robots',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: +(process.env.SMTP_PORT || 0) || undefined,
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    recaptcha: { v3SiteKey: process.env.RECAPTCHA_SITE_KEY },
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: { additionalData: '@import "@/assets/styles/mixins.scss";' },
      },
    },
  },
  typescript: {
    tsConfig: { compilerOptions: { moduleResolution: 'bundler' } },
  },
  app: { pageTransition: { name: 'page', mode: 'out-in' } },
  hooks: {
    // https://github.com/nuxt/nuxt/issues/18376
    'build:manifest': (manifest: Manifest) => {
      Object.values(manifest).forEach((file) => {
        file.assets = file.assets?.filter(
          (asset: string) => !/(.+).(webp|png|jpe?g|svg)$/.test(asset)
        );
      });
    },
  },
  routeRules: { '/': { static: true } },
  googleFonts: { families: { Inter: { wght: [400, 500, 600, 700] } } },
  security: {
    csrf: true,
    xssValidator: false,
  },
  image: {
    domains: [
      ...(process.env.NODE_ENV === 'development' ? [developmentOrigin] : []),
    ],
    alias: {
      ...(process.env.NODE_ENV === 'development'
        ? { _nuxt: `${developmentOrigin}/_nuxt` }
        : {}),
    },
    screens: {
      xs: 375,
      sm: 768,
      md: 1024,
      lg: 1240,
      xl: 1440,
      xxl: 1920,
      xxxl: 2560,
    },
    ...(process.env.NODE_ENV === 'production'
      ? { ipx: { maxAge: 31536000 } }
      : {}),
  },
  svgo: { autoImportPath: './assets/icons/' },
  pinia: {
    autoImports: ['defineStore'],
  },
  experimental: {
    componentIslands: true,
    watcher: 'chokidar',
  },
});
