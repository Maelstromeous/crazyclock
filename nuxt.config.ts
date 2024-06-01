import { readFileSync } from 'fs'
import { resolve } from 'path'

// Read version from package.json
const pkgPath = resolve(__dirname, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
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
}
