import { eachDayOfInterval, formatDuration, intervalToDuration } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

export const calculateDateString = (startDate: Date, endDate: Date, now?: Date, timezone?: string): string => {
  // If no timezone is provided, assume BST
  timezone = timezone ?? 'Europe/London'
  if (!now) {
    now = new Date(
      formatInTimeZone(new Date(), timezone, 'yyyy-MM-dd HH:mm:ssXX')
    )
  }

  // If now is already past the end date, return 'You have arrived'
  if (now > endDate) {
    return 'You have arrived!'
  }

  const startsInFuture = now < startDate
  const options = {
    format: ['hours', 'minutes', 'seconds']
  }
  let prefix = ''
  let suffix = ' remaining!'
  let dateObjects = { start: now, end: endDate }

  // If the countdown is in the future, swap the end date to be the start date
  if (startsInFuture) {
    dateObjects = { start: now, end: startDate }
    prefix = 'Countdown begins in: '
    suffix = ''
  }

  const days = totalDays(dateObjects.start, dateObjects.end, now)
  const duration = intervalToDuration(dateObjects)

  if (days === 1) {
    prefix = `${prefix}1 day `
  }

  if (days > 1) {
    prefix = `${prefix}${days} days `
  }

  return `${prefix}${formatDuration(duration, options)}${suffix}`
}

export const totalDays = (start: Date, end: Date, now: Date): number => {
  // Create an array filled with each day between the two dates, then count its length to get the exact number of days.
  const intervalDays = eachDayOfInterval({ start, end })

  // If current hour is already past the end hour, we need to remove the current day
  if (now.getHours() > end.getHours()) {
    intervalDays.shift() // Remove the first day as we're already done with the day technically
  }

  return intervalDays.length - 1 // -1 for zero array index
}
