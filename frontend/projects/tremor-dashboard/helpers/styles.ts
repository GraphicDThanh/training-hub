// Libs
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind can use combination of both clsx & twMerge
 * @param ClassValue string
 * @returns string
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
