<template>
  <div id="app" class="w-full max-w-xl m-auto px-4">
    <h1 class="text-4xl text-purple-600 my-4 text-center">
      CrazyClock!
    </h1>
    <Clock v-for="clock in clocks" :key="clock.name" :name="clock.name" :start-date="clock.startDate" :end-date="clock.endDate" />
    <div class="flex justify-center">
      <button class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" @click="toggleClocks">
        {{ hideClocks ? 'Show' : 'Hide' }} previous clocks
      </button>
    </div>

    <div
      v-show="!hideClocks"
    >
      <h2 class="text-2xl text-purple-600 my-4 text-center">
        Previous Clocks
      </h2>
      <Clock
        v-for="pclock in previousClocks"
        :key="pclock.name"
        :name="pclock.name"
        :start-date="pclock.startDate"
        :end-date="pclock.endDate"
        :previous="true"
      />
    </div>
  </div>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
</template>

<script lang="ts" setup>
import { UTCDateMini } from '@date-fns/utc'

const description = 'This project is to track the amount of time between two love birds meeting each other next. It brings a whole new level to clock watching!'

useServerSeoMeta({
  title: 'CrazyClock',
  ogTitle: 'CrazyClock',
  description,
  ogDescription: description,
  ogImage: 'https://previews.123rf.com/images/kongvector/kongvector1708/kongvector170803424/84740660-crazy-clock-character-cartoon-style-vector-illustration.jpg', // Shameless copyright infringement
  twitterCard: 'summary_large_image'
})

const hideClocks = ref(true)

// array of dates with startDate and endDate as elements
// REMEMBER: UTCDateMini month index is zero indexed, so 0 = Jan, 1 = Feb, 11 = Dec etc, bonkers I know
const clocks = [
  {
    name: '🎅Crimbo in the mountains🎅',
    startDate: new UTCDateMini(2023, 10, 4, 12, 0, 0),
    endDate: new UTCDateMini(2023, 11, 21, 21, 45, 0)
  }
]
const previousClocks = [
  {
    name: 'The weeks of happiness aka "The Swarm"',
    startDate: new UTCDateMini(2023, 8, 19, 17, 45, 0),
    endDate: new UTCDateMini(2023, 9, 21, 9, 45, 0)
  },
  {
    name: 'The one holiday to rule them all aka "Holy Holiday"',
    startDate: new UTCDateMini(2023, 6, 16, 17, 30, 0),
    endDate: new UTCDateMini(2023, 7, 1, 17, 0, 0)
  },
  {
    name: '🇨🇭Swiss Trip🇨🇭aka "The time Matt got Covid" aka "The Meltening"',
    startDate: new UTCDateMini(2023, 5, 12, 18, 45, 0),
    endDate: new UTCDateMini(2023, 6, 7, 18, 45, 0)
  },
  {
    name: 'A Swiss visits the UK aka "The start of a beautiful relationship',
    startDate: new UTCDateMini(2023, 3, 17, 17, 30, 0),
    endDate: new UTCDateMini(2023, 4, 27, 7, 30, 0)
  }
]

const toggleClocks = () => {
  hideClocks.value = !hideClocks.value
}
</script>

<style lang="scss">
body {
  font-family: 'Roboto', serif;
  font-weight: 400;
}
</style>
