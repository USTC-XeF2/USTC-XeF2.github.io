// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "XeF2",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.jpg" }],
    },
  },
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  i18n: {
    baseUrl: "https://xef2.top",
    defaultLocale: "zh-CN",
    locales: [
      {
        code: "en",
        language: "en",
        file: "en.json",
      },
      {
        code: "zh-CN",
        language: "zh",
        file: "zh.json",
      },
    ],
  },
  modules: ["@nuxt/ui", "@nuxt/content", "@nuxt/eslint", "@nuxtjs/i18n"],
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  routeRules: {
    "/blog/**": { prerender: false },
    "/en/blog/**": { prerender: false },
  },
  ui: { fonts: false },
});
