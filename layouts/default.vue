<template>
  <SpeedInsights />
  <Header />
</template>
<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'

const description =
  'This project is to track the amount of time between two love birds meeting each other next. It brings a whole new level to clock watching!'

useServerSeoMeta({
  title: 'CrazyClock',
  ogTitle: 'CrazyClock',
  description,
  ogDescription: description,
  ogImage:
    'https://previews.123rf.com/images/kongvector/kongvector1708/kongvector170803424/84740660-crazy-clock-character-cartoon-style-vector-illustration.jpg', // Shameless copyright infringement
  twitterCard: 'summary_large_image',
})
</script>
