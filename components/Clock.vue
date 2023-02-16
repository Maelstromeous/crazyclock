<template>
  <div id="app">
    <div ref="bar" class="bar">
      <div ref="fillBar" class="fill" :style="barProps"><span>{{ fillText }}</span></div>
    </div>
    <div class="clockText">{{ clockTextRendered }}</div>
    <div class="statsText">{{ statsText }}</div>
  </div>

</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "#imports";
import {
  intervalToDuration,
  formatDuration,
  differenceInMilliseconds,
} from "date-fns";

const props = defineProps<{
  startDate: string
  endDate: string
}>()

const barProps = ref({
  width: '400px'
})
const startDate = new Date(props.startDate);
const endDate = new Date(props.endDate);
const now = new Date();
let future = false;
let timer: number | undefined;
const bar = ref<HTMLElement | null>(null) // Can't use value here for some reason, it breaks lower down
const fillBar = ref<HTMLElement | null>(null)
let fillText = ref('');
let clockTextRendered = ref('Loading the crazy...')
let statsText = ref('Stats')

if (now < startDate) {
  future = true;
}


// Stats
let totalDurationSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
// Divide seconds into number of hours from the total
let totalHours = totalDurationSeconds / 3600;
let totalDays = totalHours / 24;
let percentPerHour = 100 / totalHours;
let percentPerDay = percentPerHour * 24;

console.log('percentPerHour', percentPerHour)
console.log('totalHours', totalHours)

statsText.value = `
  %age / hour: ${percentPerHour.toFixed(4)}% |
  %age / day: ${percentPerDay.toFixed(4)}% |
  Total days: ${totalDays.toFixed(2)}
`

const tickTock = (() => {
  update()
  timer = setInterval(() => {
    update()
  }, 1000)
});

const update = (() => {
  let duration = intervalToDuration({
    start: new Date(),
    end: endDate
  })

  if (future) {
    duration = intervalToDuration({
      start: new Date(),
      end: startDate
    })
  }
  clockTextRendered.value = `${formatDuration(duration)} remaining!`

  if (future) {
    clockTextRendered.value = `Countdown begins in ${formatDuration(duration)}!`
  }

  updateBar()
})

const updateBar = (() => {
  const width = bar.value?.offsetWidth ?? 0;

  const diffInMs = differenceInMilliseconds(
    endDate,
    new Date(),
  )

  const daysInMs = differenceInMilliseconds(
    endDate,
    startDate,
  );
  const percentage = 100 / daysInMs * (daysInMs - diffInMs)
  let fillWidth = width / 100 * percentage

  barProps.value.width = `${fillWidth}px`
  fillText.value = `${percentage.toFixed(4)}%`

  if (future) {
    barProps.value.width = `0px`
    fillText.value = ``
  }
})

onMounted(() => {
  tickTock();
})
onUnmounted(() => {
  clearInterval(timer);
})
</script>

<style scoped lang="scss">
.bar {
  height: 30px;
  background-color: #000;
  border-radius: 5px;
  margin-bottom: 5px;

  .fill {
    background-color: green;
    width: 5%;
    height: 100%;
    border-right: 2px solid white;
    display: flex;
    border-radius: 5px 0 0 5px;

    span {
      color: white;
      margin: auto;
    }
  }
}

.clockText {
  font-weight: bold;
  color: red;
  text-align: center;
}

.statsText {
  color: white;
  font-weight: 300;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
}
</style>
