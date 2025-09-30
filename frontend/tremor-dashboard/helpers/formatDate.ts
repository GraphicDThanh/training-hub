import { FORMAT_DATE } from "@/constants";
import dayjs from "dayjs";
import { convertDateTimeToObject, convertDateToDateTime } from "./time";

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const formatDate = (date: Date) => {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.toLocaleDateString("en", { year: "2-digit" }),
  ].join(".");
};

/**
 * @param value string - Date time string to format
 * @returns string - Formatted date time
 */
export const formatDateTime = (value: string) => {
  return dayjs(value).format("MMM D, YYYY h:mm A");
};

/**
 * @param value string - Date string to format
 * @returns string - Formatted date
 */
export const formatNewDate = (value: string) => {
  return dayjs(value).format("MMM D, YYYY");
};

export const covertDate = (value: any) => {
  const currentDate = convertDateTimeToObject(value);
  return convertDateToDateTime(currentDate, FORMAT_DATE.YEAR_MONTH_DATE_TIME);
};
