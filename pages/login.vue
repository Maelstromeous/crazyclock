<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-center">Passkey Authentication</h1>
    <input
      v-model="username"
      placeholder="Enter your username"
      class="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div class="flex space-x-4">
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        @click="register"
      >
        Register Passkey
      </button>
      <button
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        @click="login"
      >
        Login with Passkey
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { startRegistration, startAuthentication } from '@simplewebauthn/browser'

const username = ref('')

const register = async () => {
  const options = await $fetch('/api/generate-registration-options', {
    method: 'POST',
    body: { username: username.value },
  })

  const attestationResponse = await startRegistration(options)
  const verification = await $fetch('/api/verify-registration', {
    method: 'POST',
    body: { username: username.value, attestationResponse },
  })

  console.log(verification)
}

const login = async () => {
  const options = await $fetch('/api/generate-authentication-options', {
    method: 'POST',
    body: { username: username.value },
  })

  const assertionResponse = await startAuthentication(options)
  const verification = await $fetch('/api/verify-authentication', {
    method: 'POST',
    body: { username: username.value, assertionResponse },
  })

  console.log(verification)
}
</script>
