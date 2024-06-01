/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ["js", "jsx", "mjs", "ts", "tsx", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "#app": "<rootDir>/node_modules/nuxt3/dist/app/index.mjs"
  },
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
    ".*\\.(vue)$": "@vue/vue3-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(nuxt3|unenv))"
  ],
  extensionsToTreatAsEsm: ['.ts']
};
