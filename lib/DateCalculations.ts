import { differenceInMilliseconds, formatDuration, intervalToDuration } from 'date-fns'
import { UTCDateMini } from '@date-fns/utc'

export const calculateDateString = (startDate: UTCDateMini, endDate: UTCDateMini, now?: UTCDateMini): string => {
  if (!now) {
    now = new UTCDateMini()
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

  const duration = intervalToDuration(dateObjects)
  const diffInSecs = differenceInMilliseconds(dateObjects.end, now) / 1000

  // Divide the number of seconds into days, floor it, which gives us our total number of days
  const days = Math.floor(diffInSecs / (60 * 60 * 24))

  if (days === 1) {
    prefix = `${prefix}1 day `
  }

  if (days > 1) {
    prefix = `${prefix}${days} days `
  }

  return `${prefix}${formatDuration(duration, options)}${suffix}`
}
