import { readFileSync } from 'fs'
import { resolve } from 'path'

// Read version from package.json
const pkgPath = resolve(__dirname, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  pages: true,
  runtimeConfig: {
    public: {
      appVersion: pkg.version,
    },
  },
  css: ['~/assets/css/main.scss'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.API_URL || 'http://localhost:3000/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  serverMiddleware: [{ path: '/api', handler: '~/server/middleware/api.ts' }],
})
