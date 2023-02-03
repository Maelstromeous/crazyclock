<template>
  <div id="app">
    <div ref="bar" class="bar">
      <div ref="fillBar" class="fill" :style="barProps"><span>{{ fillText }}</span></div>
    </div>
    <div class="clockText">{{ clockTextRendered }}</div>
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
let timer: number | undefined;
const bar = ref<HTMLElement | null>(null) // Can't use value here for some reason, it breaks lower down
const fillBar = ref<HTMLElement | null>(null)
let fillText = ref('');
let clockTextRendered = ref('Loading the crazy...')

const tickTock = (() => {
  update()
  timer = setInterval(() => {
    update()
  }, 1000)
});

const update = (() => {
  const duration = intervalToDuration({
    start: new Date(),
    end: endDate
  })
  clockTextRendered.value = `${formatDuration(duration)} remaining!`
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
  const fillWidth = width / 100 * percentage

  barProps.value.width = `${fillWidth}px`
  fillText.value = `${percentage.toFixed(4)}%`
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
</style>
