<template>
  <div class="text-white font-light">
    <table class="table-fixed w-full" style="max-width: 250px;">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Val</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>%age / hour</td>
          <td>{{ percentPerHour.toFixed(2) }}%</td>
        </tr>
        <tr>
          <td>%age / day</td>
          <td>{{ percentPerDay.toFixed(2) }}%</td>
        </tr>
        <tr>
          <td>Total days</td>
          <td>{{ totalDays.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  startDate: Date
  endDate: Date
}>()
const startDate = new Date(props.startDate)
const endDate = new Date(props.endDate)

// Stats
const totalDurationSeconds = (endDate.getTime() - startDate.getTime()) / 1000
// Divide seconds into number of hours from the total
const totalHours = totalDurationSeconds / 3600
const totalDays = totalHours / 24
const percentPerHour = 100 / totalHours
const percentPerDay = percentPerHour * 24
</script>
