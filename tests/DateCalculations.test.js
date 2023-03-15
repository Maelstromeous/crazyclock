import { calculateDateString } from '../lib/DateCalculations'

let startDate = new Date('2023-01-01 00:00:00')
let endDate = new Date('2023-02-01 00:00:00')
let now = new Date('2023-01-01 00:00:00')

// Resets the data to ensure each test case input data is consistent
afterEach(() => {
  startDate = new Date('2023-01-01 00:00:00')
  endDate = new Date('2023-02-01 00:00:00')
  now = new Date('2023-01-01 00:00:00')
})

test('Returns some form of string', () => {
  expect(calculateDateString(startDate, endDate, now)).not.toBe('')
})

test('Returns 5 days 5 seconds exactly in expected format', () => {
  endDate = new Date('2023-01-06 00:00:05')
  expect(calculateDateString(startDate, endDate, now)).toBe('5 days 5 seconds remaining!')
})

test('Returns 5 days 5 minutes 5 seconds exactly in expected format', () => {
  endDate = new Date('2023-01-06 00:05:05')
  expect(calculateDateString(startDate, endDate, now)).toBe('5 days 5 minutes 5 seconds remaining!')
})

test('Returns 5 days 5 hours 5 minutes 5 seconds exactly in expected format', () => {
  endDate = new Date('2023-01-06 05:05:05')
  expect(calculateDateString(startDate, endDate, now)).toBe('5 days 5 hours 5 minutes 5 seconds remaining!')
})

test('Returns 35 days 5 hours 5 minutes 5 seconds exactly in expected format', () => {
  endDate = new Date('2023-02-05 05:05:05')
  expect(calculateDateString(startDate, endDate, now)).toBe('35 days 5 hours 5 minutes 5 seconds remaining!')
})

test('Shows countdown when start date is ahead of current', () => {
  now = new Date('2022-12-25 00:00:00')
  startDate = new Date('2023-01-01 00:00:05')
  expect(calculateDateString(startDate, endDate, now)).toBe('Countdown begins in: 7 days 5 seconds')
})

test('Days prefix is removed when <24h', () => {
  endDate = new Date('2023-01-01 23:30:30')
  expect(calculateDateString(startDate, endDate, now)).toBe('23 hours 30 minutes 30 seconds remaining!')
})

test('Days plural handled correctly when <1 day', () => {
  endDate = new Date('2023-01-02 01:00:05')
  expect(calculateDateString(startDate, endDate, now)).toBe('1 day 1 hour 5 seconds remaining!')
})

test('Days plural handled correctly when >2 days', () => {
  endDate = new Date('2023-01-03 01:00:05')
  expect(calculateDateString(startDate, endDate, now)).toBe('2 days 1 hour 5 seconds remaining!')
})

test('Days are handled correctly before and after end hour', () => {
  endDate = new Date('2023-01-05 12:00:00')
  now = new Date('2023-01-01 11:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('4 days 1 hour remaining!')

  now = new Date('2023-01-01 13:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('3 days 23 hours remaining!')
})

// Midnight days handling
test('Days should be consistent before and after midnight', () => {
  endDate = new Date('2023-01-05 12:00:00')
  now = new Date('2023-01-01 23:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('3 days 13 hours remaining!')

  // After midnight, the number of days should not change as the end time is noon
  now = new Date('2023-01-02 01:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('3 days 11 hours remaining!')
})
test('Expected number of hours return before and after midnight when <24h', () => {
  startDate = new Date('2023-01-01 00:00:00')
  endDate = new Date('2023-01-02 12:00:00')
  now = new Date('2023-01-01 23:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('13 hours remaining!')

  now = new Date('2023-01-02 01:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('11 hours remaining!')
})

// Days differences over the course of differing month durations
test('Return a date that is under a month', () => {
  endDate = new Date('2023-01-31 00:00:05')
  expect(calculateDateString(startDate, endDate, now)).toBe('30 days 5 seconds remaining!')
})
test('Return a date that is 32 days (over a month)', () => {
  startDate = new Date('2023-03-01 00:00:00')
  endDate = new Date('2023-04-02 00:00:05')
  now = new Date('2023-03-01 00:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('32 days 5 seconds remaining!')
})
test('Return a date that is exactly one "month" as days', () => {
  startDate = new Date('2023-03-01 00:00:00')
  endDate = new Date('2023-04-01 00:00:05')
  now = new Date('2023-03-01 00:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('31 days 5 seconds remaining!')
})
test('Return a date that is 61 days exactly (over 2 "months")', () => {
  startDate = new Date('2023-03-01 00:00:00')
  endDate = new Date('2023-05-01 00:00:05')
  now = new Date('2023-03-01 00:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('61 days 5 seconds remaining!')
})
test('Return a date that is 367 days exactly (over a year)', () => {
  startDate = new Date('2023-03-01 00:00:00')
  endDate = new Date('2024-03-02 00:00:05')
  now = new Date('2023-03-01 00:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('367 days 5 seconds remaining!')
})

// Different month durations handling
test('Return date over a 28 day month correctly (32 days)', () => {
  startDate = new Date('2023-02-01 00:00:00')
  endDate = new Date('2023-03-05 00:00:05')
  now = new Date('2023-02-01 00:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('32 days 5 seconds remaining!')
})
// Handle leap years
test('Return date over a 29 day month correctly (leap year)', () => {
  startDate = new Date('2020-02-01 00:00:00')
  endDate = new Date('2020-03-01 00:00:05')
  now = new Date('2020-02-01 00:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('29 days 5 seconds remaining!')
})
test('Return date over a 30 day month correctly (34 days)', () => {
  startDate = new Date('2023-04-01 00:00:00')
  endDate = new Date('2023-05-05 00:00:05')
  now = new Date('2023-04-01 00:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('34 days 5 seconds remaining!')
})
test('Return date over a 31 day month correctly (35 days)', () => {
  startDate = new Date('2023-05-01 00:00:00')
  endDate = new Date('2023-06-05 00:00:05')
  now = new Date('2023-05-01 00:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('35 days 5 seconds remaining!')
})
test('Return "You have arrived" when the end date is reached', () => {
  endDate = new Date('2023-01-02 00:00:00')
  now = new Date('2023-01-03 00:00:00')
  expect(calculateDateString(startDate, endDate, now)).toBe('You have arrived!')
})
