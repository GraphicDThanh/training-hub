// Constants
import { MESSAGES_ERROR } from "@/constants";

// Types
import { BirthDay } from "@/types";

/**
 *
 * The function handler check limit amount or price
 *
 * @param value - the amount or price
 * @returns - If amount > 20000 -> the error message displays, If amount < 20000 -> passed
 */
export const validateWithCurrencyLimit = (
  value: string,
  valueLimit: number,
  errorMessage: string,
): string | true => {
  const valueConvert = value.replace(/,/g, "");
  return Number(valueConvert) < valueLimit || errorMessage;
};

/**
 *
 * The function handler check greater than the current time
 *
 * @param value - the value birth date
 * @returns - If the birth date > the current date -> error. Opposite, it will true
 */
export const validateBirthDate = (value: BirthDay): string | true => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const birthDateValue: BirthDay = {
    months: currentMonth,
    date: currentDay,
    years: currentYear,
    hours: 15,
    minutes: 50,
    seconds: 15,
    milliseconds: 1,
  };
  const { date, months, years } = value ?? birthDateValue;
  const birthDate = new Date(years, Number(months), date);

  if (!date || !months || !years) return MESSAGES_ERROR.FIELD_REQUIRED;

  return birthDate <= currentDate || MESSAGES_ERROR.INVALID_BIRTH_DATE;
};

/**
 *
 * The function handler check validate amount
 *
 * @param value - The amount value
 * @param rules - This object contains rules
 * @param errorMessage - This contains the error message
 * @returns - If TRUE -> by pass || If FALSE -> the error message displays
 */
export const validateCurrencyWithRules = (
  value: string,
  rules: Record<string, number>,
  errorMessage: Record<string, string>,
): string | true => {
  const valueConvert = value.replace(/,/g, "");
  const { valueLimit, minValue } = rules ?? {};
  const { limit, min } = errorMessage ?? {};

  if (Number(valueConvert) > valueLimit) return limit;

  if (Number(valueConvert) <= minValue) return min;

  return true;
};
