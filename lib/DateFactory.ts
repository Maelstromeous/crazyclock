import { formatInTimeZone } from 'date-fns-tz'

export const utcDate = (date: Date): Date => {
  return new Date(
    formatInTimeZone(new Date(date), 'UTC', 'yyyy-MM-dd HH:mm:ssXX')
  )
}
