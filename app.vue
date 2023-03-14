<template>
  <div id="app">
    <h1>CrazyClock!</h1>
    <Clock :startDate="'2023-02-17 16:05:00'" :endDate="'2023-03-25 13:30:00'"></Clock>
  </div>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap" rel="stylesheet">
</template>

<script lang="ts" setup>
const description = 'This project is to track the amount of time between two love birds meeting each other next. It brings a whole new level to clock watching!'

useServerSeoMeta({
  title: 'CrazyClock',
  ogTitle: 'CrazyClock',
  description,
  ogDescription: description,
  ogImage: 'https://previews.123rf.com/images/kongvector/kongvector1708/kongvector170803424/84740660-crazy-clock-character-cartoon-style-vector-illustration.jpg', // Shameless copyright infringement
  twitterCard: 'summary_large_image',
})
</script>

<style lang="scss">
body {
  background-color: #555;
  font-family: 'Roboto', serif
}

#app {
  width: 100%;
  max-width: 500px;
  margin: auto;

  h1 {
    color: white;
    text-align: center;
  }
}

</style>
