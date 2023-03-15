<template>
  <div id="app" class="w-full max-w-lg m-auto px-4">
    <h1 class="text-4xl text-purple-600 my-4 text-center">
      CrazyClock!
    </h1>
    <Clock v-for="clock in clocks" :key="clock" :start-date="clock.startDate" :end-date="clock.endDate" />
  </div>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
</template>

<script lang="ts" setup>
const description = 'This project is to track the amount of time between two love birds meeting each other next. It brings a whole new level to clock watching!'

useServerSeoMeta({
  title: 'CrazyClock',
  ogTitle: 'CrazyClock',
  description,
  ogDescription: description,
  ogImage: 'https://previews.123rf.com/images/kongvector/kongvector1708/kongvector170803424/84740660-crazy-clock-character-cartoon-style-vector-illustration.jpg', // Shameless copyright infringement
  twitterCard: 'summary_large_image'
})

// array of dates with startDate and endDate as elements
const clocks = [
  {
    startDate: new Date('2023-02-17 16:05:00'),
    endDate: new Date('2023-03-25 13:30:00')
  },
  {
    startDate: new Date('2023-04-17 18:30:00'),
    endDate: new Date('2023-05-27 13:30:00')
  }
]
</script>

<style lang="scss">
body {
  font-family: 'Roboto', serif;
  font-weight: 400;
}
</style>
