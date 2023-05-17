<template>
  <section class="mb-4 pb-2 border-b border-b-gray-600 last-of-type:border-0">
    <p class="text-center text-white mb-2 text-lg">
      {{ startDate.toLocaleString() }} to {{ endDate.toLocaleString() }}
    </p>
    <div
      v-if="!future"
      ref="bar"
      class="bg-black rounded-md mb-2 text-white flex bg-gradient-to-r via-green-600 from-red-600 to-blue-600"
      style="height: 30px"
    >
      <div ref="fillBar" class="h-full flex rounded-tl-md rounded-bl-md border-r-white transition-all ease-out duration-1000" :style="barProps">
        <span class="m-auto">{{ fillText }}</span>
      </div>
      <div ref="blackBar" class="h-full bg-black rounded-tr-md rounded-br-md transition-all ease-out duration-1000" :style="blackBarProps" />
    </div>
    <div class="text-center text-amber-400 font-bold">
      {{ clockText }}
    </div>
    <Stats :start-date="startDate" :end-date="endDate" />
  </section>
</template>

<script lang="ts" setup>
/* eslint-disable vue/no-setup-props-destructure */
import { differenceInMilliseconds } from 'date-fns'
import { UTCDateMini } from '@date-fns/utc'
import { onMounted, onUnmounted, ref } from '#imports'
import { calculateDateString } from '~/lib/DateCalculations'

const props = defineProps<{
  startDate: UTCDateMini
  endDate: UTCDateMini
}>()

const barProps = ref({
  width: '0%',
  borderRight: '0'
})
const blackBarProps = ref({
  width: '100%',
  borderRadius: '0'
})
const startDate = props.startDate
const endDate = props.endDate
const now = new UTCDateMini()
let future = false

if (now < props.startDate) {
  future = true
}

let timer: NodeJS.Timer
const bar = ref<HTMLElement | null>(null) // Can't use value here for some reason, it breaks lower down
const fillBar = ref<HTMLElement | null>(null)
const fillText = ref('')
const clockText = ref('Loading the crazy...')
let barPercentage = 0

const tickTock = () => {
  clockText.value = calculateDateString(startDate, endDate) // Run it on load
  updateBar()

  // Don't run the timer if the date is in the past or future
  if (endDate < new Date()) {
    return
  }
  timer = setInterval(() => {
    clockText.value = calculateDateString(startDate, endDate)
    updateBar()
  }, 1000)
}

const updateBar = () => {
  const width = bar.value?.offsetWidth ?? 0

  const diffInMs = differenceInMilliseconds(
    endDate,
    new Date()
  )

  const daysInMs = differenceInMilliseconds(
    endDate,
    startDate
  )
  barPercentage = 100 / daysInMs * (daysInMs - diffInMs)
  let fillWidth = width / 100 * barPercentage

  if (barPercentage >= 100) {
    fillWidth = width
    fillText.value = 'FINALLY!'
  } else {
    fillText.value = `${barPercentage.toFixed(4)}%`
    barProps.value.borderRight = '2px solid white'
  }

  if (barPercentage <= 0) {
    blackBarProps.value.borderRadius = '0.375rem'
    barProps.value.borderRight = '0px'
  } else {
    blackBarProps.value.borderRadius = '0 0.375rem 0.375rem 0'
  }

  const blackBarWidth = (width - fillWidth + 1).toFixed(0)
  barProps.value.width = `${fillWidth.toFixed(0)}px`
  blackBarProps.value.width = `${blackBarWidth}px`

  if (future) {
    barProps.value.width = '0px'
    blackBarProps.value.width = `${width}px`
    fillText.value = ''
  }
}

onMounted(() => {
  tickTock()
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>
