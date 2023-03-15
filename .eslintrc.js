module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
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
