<template>
  <div id="app">
    <h1>CrazyClock!</h1>
    <Clock :startDate="'2023-02-17 16:05:00'" :endDate="'2023-03-27 18:00:00'"></Clock>
  </div>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap" rel="stylesheet">
</template>

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
