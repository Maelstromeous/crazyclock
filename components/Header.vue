<template>
  <div id="app" class="w-full max-w-xl m-auto px-4">
    <div class="flex flex-col items-center text-center my-4">
      <h1 class="text-4xl text-purple-600">CrazyClock!</h1>
      <span
        class="inline mt-1 w-auto bg-gray-800 rounded-md px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-600"
      >
        v{{ version }}
      </span>
      <a href="/login">
        <span
          class="inline mt-1 w-auto bg-gray-800 rounded-md px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-600"
        >
          Login
        </span>
      </a>
    </div>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const version = config.public.appVersion
</script>
