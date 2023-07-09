import { UTCDateMini } from '@date-fns/utc'
import { calculateDateString } from '../lib/DateCalculations'

// REMEMBER: UTCDateMini month index is zero indexed, so 0 = Jan, 1 = Feb, 11 = Dec etc, bonkers I know
let startDate = new UTCDateMini(2023, 0, 1, 0, 0, 0)
let endDate = new UTCDateMini(2023, 1, 1, 0, 0, 0)
let now = new UTCDateMini(2023, 0, 1, 0, 0, 0)

// Resets the data to ensure each test case input data is consistent
afterEach(() => {
  startDate = new UTCDateMini(2023, 0, 1, 0, 0, 0)
  endDate = new UTCDateMini(2023, 1, 1, 0, 0, 0)
  now = new UTCDateMini(2023, 0, 1, 0, 0, 0)
})

test('Returns some form of string', () => {
  expect(calculateDateString(startDate, endDate, now)).not.toBe('')
})

test('Returns 1 day 5 seconds exactly in expected format', () => {
  endDate = new UTCDateMini(2023, 0, 2, 0, 0, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('1 day 5 seconds remaining!')
})

test('Returns 5 days 5 seconds exactly in expected format', () => {
  endDate = new UTCDateMini(2023, 0, 6, 0, 0, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('5 days 5 seconds remaining!')
})

test('Returns 5 days 5 minutes 5 seconds exactly in expected format', () => {
  endDate = new UTCDateMini(2023, 0, 6, 0, 5, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('5 days 5 minutes 5 seconds remaining!')
})

test('Returns 5 days 5 hours 5 minutes 5 seconds exactly in expected format', () => {
  endDate = new UTCDateMini(2023, 0, 6, 5, 5, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('5 days 5 hours 5 minutes 5 seconds remaining!')
})

test('Returns 35 days 5 hours 5 minutes 5 seconds exactly in expected format', () => {
  endDate = new UTCDateMini(2023, 1, 5, 5, 5, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('35 days 5 hours 5 minutes 5 seconds remaining!')
})

test('Shows countdown when start date is ahead of current', () => {
  now = new UTCDateMini(2022, 11, 25, 0, 0, 0)
  startDate = new UTCDateMini(2023, 0, 1, 0, 0, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('Countdown begins in: 7 days 5 seconds')
})

test('Days prefix is removed when <24h', () => {
  endDate = new UTCDateMini(2023, 0, 1, 23, 30, 30)
  expect(calculateDateString(startDate, endDate, now)).toBe('23 hours 30 minutes 30 seconds remaining!')
})

test('Days plural handled correctly when <1 day', () => {
  endDate = new UTCDateMini(2023, 0, 2, 1, 0, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('1 day 1 hour 5 seconds remaining!')
})

test('Days plural handled correctly when >2 days', () => {
  endDate = new UTCDateMini(2023, 0, 3, 1, 0, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('2 days 1 hour 5 seconds remaining!')
})

test('Days are handled correctly before and after end hour', () => {
  endDate = new UTCDateMini(2023, 0, 5, 12, 0, 0)

  now = new UTCDateMini(2023, 0, 1, 11, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('4 days 1 hour remaining!')

  now = new UTCDateMini(2023, 0, 1, 13, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('3 days 23 hours remaining!')
})

test('Return correct date when user visits the page before and after the end time hour', () => {
  endDate = new UTCDateMini(2023, 4, 27, 8, 30, 0)

  // "Visit" the page before the hour flip over
  now = new UTCDateMini(2023, 4, 17, 8, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('10 days 30 minutes remaining!')

  // "Visit" the page again after the end time hour
  now = new UTCDateMini(2023, 4, 17, 8, 35, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('9 days 23 hours 55 minutes remaining!')

  // "Visit" the page again after the end time second
  now = new UTCDateMini(2023, 4, 17, 8, 30, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('9 days 23 hours 59 minutes 55 seconds remaining!')
})

// Midnight days handling
test('Days should be consistent before and after midnight', () => {
  endDate = new UTCDateMini(2023, 0, 5, 12, 0, 0)
  now = new UTCDateMini(2023, 0, 1, 23, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('3 days 13 hours remaining!')

  // After midnight, the number of days should not change as the end time is noon
  now = new UTCDateMini(2023, 0, 2, 1, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('3 days 11 hours remaining!')
})
test('Expected number of hours return before and after midnight when <24h', () => {
  endDate = new UTCDateMini(2023, 0, 2, 12, 0, 0)
  now = new UTCDateMini(2023, 0, 1, 23, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('13 hours remaining!')

  now = new UTCDateMini(2023, 0, 2, 1, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('11 hours remaining!')
})

// Days differences over the course of differing month durations
test('Return a date that is under a month', () => {
  endDate = new UTCDateMini(2023, 0, 31, 0, 0, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('30 days 5 seconds remaining!')
})
test('Return a date that is 32 days (over a month)', () => {
  endDate = new UTCDateMini(2023, 1, 2, 0, 0, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('32 days 5 seconds remaining!')
})
test('Return a date that is exactly one "month" as days', () => {
  endDate = new UTCDateMini(2023, 1, 1, 0, 0, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('31 days 5 seconds remaining!')
})
test('Return a date that is 61 days exactly (over 2 "months")', () => {
  endDate = new UTCDateMini(2023, 2, 3, 0, 0, 5)
  expect(calculateDateString(startDate, endDate, now)).toBe('61 days 5 seconds remaining!')
})
test('Return a date that is 367 days and 5 seconds exactly (over a year)', () => {
  startDate = new UTCDateMini(2023, 2, 1, 0, 0, 0)
  endDate = new UTCDateMini(2024, 2, 2, 0, 0, 5)
  now = startDate
  expect(calculateDateString(startDate, endDate, now)).toBe('367 days 5 seconds remaining!')
})

// Different month durations handling
test('Return date over a 28 day month correctly (32 days 5 seconds)', () => {
  startDate = new UTCDateMini(2023, 1, 1, 0, 0, 0)
  endDate = new UTCDateMini(2023, 2, 5, 0, 0, 5)
  now = startDate
  expect(calculateDateString(startDate, endDate, now)).toBe('32 days 5 seconds remaining!')
})
// Handle leap years
test('Return date over a 29 day month correctly in a leap year (29 days 5 seconds)', () => {
  startDate = new UTCDateMini(2020, 1, 1, 0, 0, 0)
  endDate = new UTCDateMini(2020, 2, 1, 0, 0, 5)
  now = startDate
  expect(calculateDateString(startDate, endDate, now)).toBe('29 days 5 seconds remaining!')
})
test('Return date over a 30 day month correctly (34 days 5 seconds)', () => {
  startDate = new UTCDateMini(2023, 3, 1, 0, 0, 0)
  endDate = new UTCDateMini(2023, 4, 5, 0, 0, 5)
  now = startDate
  expect(calculateDateString(startDate, endDate, now)).toBe('34 days 5 seconds remaining!')
})
test('Return date over a 31 day month correctly (35 days 5 seconds)', () => {
  startDate = new UTCDateMini(2023, 4, 1, 0, 0, 0)
  endDate = new UTCDateMini(2023, 5, 5, 0, 0, 5)
  now = startDate
  expect(calculateDateString(startDate, endDate, now)).toBe('35 days 5 seconds remaining!')
})
test('Return complex date over 40 days correctly (40 days 13 hours 35 minutes 23 seconds', () => {
  startDate = new UTCDateMini(2023, 3, 17, 18, 30, 0)
  endDate = new UTCDateMini(2023, 4, 28, 9, 35, 33)
  now = new UTCDateMini(2023, 3, 17, 20, 0, 10)
  expect(calculateDateString(startDate, endDate, now)).toBe('40 days 13 hours 35 minutes 23 seconds remaining!')
})

// Partial day handling
test('Return date over a month when now time hour is less than end date hour (39 days 1 hour 30 mins)', () => {
  startDate = new UTCDateMini(2023, 3, 17, 18, 30, 0)
  endDate = new UTCDateMini(2023, 4, 27, 13, 30, 0)
  now = new UTCDateMini(2023, 3, 18, 12, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('39 days 1 hour 30 minutes remaining!')
})
test('Return date over a month when now time hour is greater than end date hour (38 days 17 hours 30 mins)', () => {
  startDate = new UTCDateMini(2023, 3, 17, 18, 30, 0)
  endDate = new UTCDateMini(2023, 4, 27, 13, 30, 0)
  now = new UTCDateMini(2023, 3, 18, 20, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('38 days 17 hours 30 minutes remaining!')
})
test('Return date over a partial day less than 24 hours', () => {
  endDate = new UTCDateMini(2023, 0, 5, 6, 0, 5)
  now = new UTCDateMini(2023, 0, 4, 7, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('23 hours 5 seconds remaining!')
})
test('Return date over a partial under 5 days', () => {
  endDate = new UTCDateMini(2023, 0, 10, 6, 0, 5)
  now = new UTCDateMini(2023, 0, 5, 7, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('4 days 23 hours 5 seconds remaining!')
})
test('Return date over a partial over 5 days', () => {
  endDate = new UTCDateMini(2023, 0, 10, 6, 0, 5)
  now = new UTCDateMini(2023, 0, 5, 5, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('5 days 1 hour 5 seconds remaining!')
})

// DST handling
// BST Sun, Mar 26, 2023 1:00 AM -> Sun, Oct 29, 2023 2:00 AM
// DST in March adds 1 hour
test('Return date entering DST (1 day plus 1 hour due to DST)', () => {
  endDate = new UTCDateMini(2023, 2, 27, 0, 0, 5)
  now = new UTCDateMini(2023, 2, 26, 0, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('1 day 1 hour 5 seconds remaining!')
})
test('Return date exiting DST (1 day 6 hours minus 1 hour due to DST)', () => {
  endDate = new UTCDateMini(2023, 9, 30, 6, 0, 5)
  now = new UTCDateMini(2023, 9, 29, 0, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('1 day 5 hours 5 seconds remaining!')
})
test('Return date exiting DST over longer period (30 days 6 hours minus 1 hour due to DST)', () => {
  endDate = new UTCDateMini(2023, 9, 31, 6, 0, 5)
  now = new UTCDateMini(2023, 9, 1, 0, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('30 days 5 hours 5 seconds remaining!')
})

test('Return "You have arrived" when the end date is reached', () => {
  endDate = new UTCDateMini(2023, 0, 2, 0, 0, 0)
  now = new UTCDateMini(2023, 0, 3, 0, 0, 0)
  expect(calculateDateString(startDate, endDate, now)).toBe('You have arrived!')
})

test('Return the end date of the trip when the showEnd var is passed', () => {
  now = new UTCDateMini(2023, 0, 1, 1, 0, 0)
  startDate = new UTCDateMini(2023, 0, 5, 0, 0, 0)
  endDate = new UTCDateMini(2023, 0, 6, 0, 0, 0)
  expect(calculateDateString(startDate, endDate, now, true)).toBe('4 days 23 hours remaining!')
})
