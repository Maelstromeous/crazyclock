<template>
  <SpeedInsights />
  <div id="app" class="w-full max-w-xl m-auto px-4">
    <h1 class="text-4xl text-purple-600 mt-4 text-center">CrazyClock!</h1>
    <p class="text-sm m-auto mt-0 mb-4 text-center text-gray-500">
      Version: {{ version }}
    </p>
    <Clock
      v-for="clock in clocks"
      :key="clock.name"
      :name="clock.name"
      :start-date="clock.startDate"
      :end-date="clock.endDate"
    />
  </div>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
    rel="stylesheet"
  />
</template>

<script lang="ts" setup>
import { UTCDateMini } from '@date-fns/utc'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { useRuntimeConfig } from '#app'

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

const config = useRuntimeConfig()
const version = config.public.appVersion

// array of dates with startDate and endDate as elements
// REMEMBER: UTCDateMini month index is zero indexed, so 0 = Jan, 1 = Feb, 11 = Dec etc, bonkers I know
const clocks = [
  {
    name: 'The Long Wait',
    startDate: new UTCDateMini(2024, 4, 11, 20, 0, 0),
    endDate: new UTCDateMini(2024, 6, 9, 19, 0, 0),
  },
  {
    name: 'Happy May',
    startDate: new UTCDateMini(2024, 3, 6, 15, 0, 0),
    endDate: new UTCDateMini(2024, 4, 3, 20, 45, 0),
  },
  {
    name: 'Bunnies in the mountains',
    startDate: new UTCDateMini(2024, 1, 24, 13, 0, 0),
    endDate: new UTCDateMini(2024, 2, 28, 22, 45, 0),
  },
]
</script>
