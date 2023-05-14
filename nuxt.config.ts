import {Manifest} from 'vue-bundle-renderer';

const developmentOrigin = `http://localhost:${process.env.PORT || 3000}`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-security',
    '@nuxtjs/google-fonts',
    '@nuxt/image-edge',
    'nuxt-svgo',
    '@nuxtjs/robots',
  ],
  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: +process.env.SMTP_PORT || undefined,
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
  },
  vite: {css: {preprocessorOptions: {scss: {additionalData: '@import "@/assets/styles/mixins.scss";'}}}},
  hooks: {
    // https://github.com/nuxt/nuxt/issues/18376
    'build:manifest': (manifest: Manifest) => {
      Object.values(manifest).forEach((file) => {
        file.assets = file.assets?.filter((asset: string) => !/(.+).(webp|png|jpe?g|svg)$/.test(asset));
      });
    },
  },
  routeRules: {'/': {static: true}},
  googleFonts: {families: {Inter: {wght: [400, 500, 600, 700]}}},
  security: {
    csrf: true,
    xssValidator: false,
  },
  image: {
    domains: [...(process.env.NODE_ENV === 'development' ? [developmentOrigin] : [])],
    alias: {...(process.env.NODE_ENV === 'development' ? {'_nuxt': `${developmentOrigin}/_nuxt`} : {})},
    screens: {
      xs: 375,
      sm: 768,
      md: 1024,
      lg: 1240,
      xl: 1440,
      xxl: 1920,
      xxxl: 2560,
    },
    ...(process.env.NODE_ENV === 'production' ? {ipx: {maxAge: 31536000}} : {}),
  },
  svgo: {autoImportPath: './assets/icons/'},
});
