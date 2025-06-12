// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  future: { compatibilityVersion: 4 },
  modules: [
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    '@nuxt/image',
    
    
  ],
   vite: {
    ssr: {
      noExternal: ['@iconify/utils','consola']
    }
  },
  ssr: true,
  nitro : {
    preset: 'node',
  },
  experimental: {
    viewTransition: true
  },
  devtools: { enabled: true },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://gamedeal-back.onrender.com'
}
    } 
   }
)

