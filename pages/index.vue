<template>
  <Clock
    v-for="clock in clocks"
    :key="clock.name"
    :name="clock.name"
    :start-date="clock.startDate"
    :end-date="clock.endDate"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
    rel="stylesheet"
  />
</template>

<script lang="ts" setup>
import { UTCDateMini } from '@date-fns/utc'

// array of dates with startDate and endDate as elements
// REMEMBER: UTCDateMini month index is zero indexed, so 0 = Jan, 1 = Feb, 11 = Dec etc, bonkers I know
const clocks = [
  {
    name: 'The Long Wait',
    startDate: new UTCDateMini(2024, 4, 11, 20, 0, 0),
    endDate: new UTCDateMini(2024, 5, 29, 20, 45, 0),
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
