import {eachDayOfInterval, formatDuration, intervalToDuration} from "date-fns";

export const calculateDateString = ((startDate: Date, endDate: Date, now?: Date): string => {
  if (!now) {
    now = new Date()
  }

  // If now is already past the end date, return 'You have arrived'
  if (now > endDate) {
    return 'You have arrived!'
  }

  const startsInFuture = now < startDate;
  const options = {
    format: ['hours', 'minutes', 'seconds']
  };
  let prefix = '';
  let suffix = ' remaining!';
  let dateObjects = {start: now, end: endDate}

  // If the countdown is in the future, swap the end date to be the start date
  if (startsInFuture) {
    dateObjects = {start: now, end: startDate};
    prefix = 'Countdown begins in: ';
    suffix = '';
  }

  const days = totalDays(dateObjects.start, dateObjects.end)
  const duration = intervalToDuration(dateObjects)

  if (days === 1) {
    prefix = `${prefix}1 day `
  }

  if (days > 1) {
    prefix = `${prefix}${days} days `
  }

  return `${prefix}${formatDuration(duration, options)}${suffix}`
})

export const totalDays = ((start: Date, end: Date): number => {
  const duration = intervalToDuration({start, end})
  let days = duration.days ?? 0

  // If we're over more than what is expected to be a "month" which varies in language, we need to start counting the actual number of days and performing logic... sigh
  // Create an array filled with each day between the two dates, then count its length to get the exact number of days.
  if (duration.months || duration.years) {
    const intervalDays = eachDayOfInterval({start, end})
    days = intervalDays.length - 1 // -1 for the array length
  }

  return days
})
