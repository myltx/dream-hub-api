// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  experimental: {
    viewTransition: true,
  },
  app: {
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  plugins: ["~/plugins/logto.ts"],
  modules: [
    "@unocss/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@nuxt/ui",
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    logtoAppId: process.env.NUXT_LOGTO_APP_ID,
    logtoEndpoint: process.env.NUXT_LOGTO_ENDPOINT,
    // 公开变量（客户端也可用）
    public: {
      logtoAppId: process.env.NUXT_LOGTO_APP_ID || "",
      logtoEndpoint: process.env.NUXT_LOGTO_ENDPOINT || "",
      // backendEndpoint: [''],
      signInRedirectURI: process.env.LOGTO_SIGN_IN_REDIRECT_URI || "",
      signOutRedirectURI: process.env.LOGTO_SIGN_OUT_REDIRECT_URI || "",
      supabaseUrl: process.env.SUPABASE_URL || "",
      supabaseKey: process.env.SUPABASE_KEY || "",
      supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET || "",
      jti: process.env.JTI || "",
    },
  },
  unocss: {
    nuxtLayers: true,
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
});
