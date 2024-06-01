module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'
  ],
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    'no-console': 'error'
  },
  ignorePatterns: [
    'node_modules/*'
  ]
}
