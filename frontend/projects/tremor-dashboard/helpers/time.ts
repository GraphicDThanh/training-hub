// Types
import { BirthDay, OptionType } from "@/types";
import dayjs from "dayjs";

import toObject from "dayjs/plugin/toObject";
import objectSupport from "dayjs/plugin/objectSupport";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(toObject);
dayjs.extend(objectSupport);

dayjs.extend(isSameOrBefore);

/**
 *  The function handles render time
 *
 * @param start - the start time
 * @param end - the end time
 * @returns - Outputs the time from start time to end time (option of select)
 *
 * Ex: start = 1, end = 10 => the time renders 1->10
 */
export const generateTimes = (start: number, end: number): OptionType[] => {
  const times: OptionType[] = [];

  for (let i = start; i <= end; i++) {
    times.push({ option: i.toString(), value: i.toString() });
  }

  return times;
};

/**
 * Generates an array of days for a given month and year.
 * @param {number} month - The month (1-12).
 * @param {number} year - The year.
 * @returns {Date[]} An array of Date objects representing the days of the specified month.
 */
export const generateDays = (month: number, year: number) => {
  return generateTimes(1, new Date(year, month, 0).getDate());
};

/**
 *
 * Function to convert from Date to object
 *
 * @param time - the value from api returns
 * @returns - object {date,month,years,...}
 */
export const convertDateTimeToObject = (time: string): BirthDay => {
  const object = dayjs(time).toObject();

  return {
    ...object,
    months: object.months,
    date: object.date,
    years: object.years,
  };
};

export const convertDateToDateTime = (object: BirthDay, token: string) => {
  return dayjs(object).format(token);
};

/**
 *
 * The function handler compares between create element time with the current time
 *
 * @param time - The time when created a element in the past
 * @returns - The time format by condition
 * ******** if time < current time === 1 year up to -> 02:23 PM May 07, 2023
 * ******** if time <= current time === 1 - 11 months -> 02:24 PM Jan 07
 * ******** if time < current time ====  -> 02:23 PM
 */
export const calcTime = (time: string) => {
  if (dayjs(time).isBefore(dayjs(), "year")) {
    return dayjs(time).format("hh:mm A MMM DD, YYYY");
  }

  if (
    dayjs(time).isSameOrBefore(dayjs(), "month") &&
    dayjs(time).isBefore(dayjs(), "day")
  ) {
    return dayjs(time).format("hh:mm A MMM DD");
  }

  return dayjs(time).format("hh:mm A");
};
