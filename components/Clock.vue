<template>
  <div ref="bar" class="bg-black rounded-md mb-2 text-white flex bg-gradient-to-r via-green-600 from-red-600 to-blue-600" style="height: 30px">
    <div ref="fillBar" class="h-full flex rounded-tl-md rounded-bl-md border-r-white transition-all ease-out duration-1000" :style="barProps">
      <span class="m-auto">{{ fillText }}</span>
    </div>
    <div ref="blackBar" class="h-full bg-black rounded-tr-md rounded-br-md transition-all ease-out duration-1000" :style="blackBarProps"></div>
  </div>
  <div class="text-center text-amber-400 bg-#50">{{ clockText }}</div>
  <Stats :startDate="startDate" :endDate="endDate"></Stats>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "#imports";
import {differenceInMilliseconds} from "date-fns";
import {calculateDateString} from "~/lib/DateCalculations";

const props = defineProps<{
  startDate: Date
  endDate: Date
}>()

const barProps = ref({
  width: '0%',
  borderRight: '2px solid white'
})
const blackBarProps = ref({
  width: '100%'
})
const startDate = new Date(props.startDate);
const endDate = new Date(props.endDate);
let future = false;
let timer: NodeJS.Timer;
const bar = ref<HTMLElement | null>(null) // Can't use value here for some reason, it breaks lower down
const fillBar = ref<HTMLElement | null>(null)
let fillText = ref('');
let clockText = ref('Loading the crazy...')
let barPercentage = 0;

const tickTock = (() => {
  clockText.value = calculateDateString(startDate, endDate) // Run it on load
  updateBar()

  // Don't run the timer if the end date is in the past
  if (endDate < new Date()) {
    return
  }
  timer = setInterval(() => {
    clockText.value = calculateDateString(startDate, endDate)
    updateBar()
  }, 1000)
});

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
  barPercentage = 100 / daysInMs * (daysInMs - diffInMs)
  let fillWidth = width / 100 * barPercentage

  if (barPercentage >= 100) {
    fillWidth = width
    fillText.value = 'FINALLY!'
    barProps.value.borderRight = '0px'

  } else {
    fillText.value = `${barPercentage.toFixed(4)}%`
  }

  barProps.value.width = `${fillWidth}px`
  blackBarProps.value.width = `${width - fillWidth}px`

  if (future) {
    barProps.value.width = `0px`
    blackBarProps.value.width = `${width}px`
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
