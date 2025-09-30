// Constants
import {
  ROUTES,
  INVOICE_REGEX,
  ORDER_LIST_REGEX,
  PRODUCT_LIST_REGEX,
} from "@/constants";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const isBrowser = typeof window !== "undefined";

export const isEmpty = (value: any) => {
  // check if the value is an object
  if (typeof value === "object" && value !== null) {
    return Object.keys(value).length === 0;
  } else {
    // return true if the value is falsy, false otherwise
    return !value;
  }
};

export const getErrorMessage = (statusCode: number, statusText: string) => {
  const errorMessage = `An error has occurred: ${statusCode} - ${statusText}`;
  return errorMessage;
};

export const getObjectValue = <T, Key extends keyof T>(obj: T, key: string) => {
  return obj[key as Key] as string;
};

export const getCrumbName = ({
  name,
  params,
}: {
  name: string;
  params?: string | string[];
}) => {
  if (params === name) {
    return `${params && "#" + params}`;
  } else {
    return name.replace("-", " ");
  }
};

/**
 * Filter data by value
 * @param data []
 * @param field string
 * @param value string
 * @returns []
 */
export const searchProductDataByValue = <T>(
  data: T[],
  field: string,
  value: string,
) =>
  data.filter(
    item =>
      getObjectValue(item, field)?.toLowerCase().includes(value.toLowerCase()),
  );

/**
 * Search Order data by value
 * @param data []
 * @param fieldOuter string
 * @param fieldInner string
 * @param value string
 * @returns []
 */
export const searchOrderDataByValue = <T, Y>(
  data: T[],
  fieldOuter: string,
  fieldInner: string,
  value: string,
) =>
  data.filter(
    item =>
      (getObjectValue(item, fieldOuter) as unknown as Y[])?.find(
        itemInner =>
          getObjectValue(itemInner, fieldInner)
            ?.toLowerCase()
            .includes(value.toLowerCase()),
      ),
  );

/**
 * Convert number to array
 * @param start number
 * @param end number
 * @returns [number]
 */
export const rangeNumber = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * Handle match path
 * @param path string
 * @returns
 */
export const handleMatchPath = (path: string) => {
  let orderMatch = path.match(ORDER_LIST_REGEX);
  let productMatch = path.match(PRODUCT_LIST_REGEX);
  let invoiceMatch = path.match(INVOICE_REGEX);

  switch (true) {
    case orderMatch !== null:
      return "Order Details";

    case productMatch !== null:
      return "Product Details";

    case invoiceMatch !== null:
      return "Invoice Details";

    default:
      return null;
  }
};

/**
 * Handle single key 
 * @param key string
 * @param router AppRouterInstance
 * @returns
 */
export const handleSingleKey = (key: string, router: AppRouterInstance) => {
  switch (key) {
    case "p":
      router.replace(ROUTES.PRODUCTS);
      break;
    case "b":
      router.replace(ROUTES.BILLING);
      break;
    case "o":
      router.replace(ROUTES.ORDERS);
      break;
    case "s":
      router.replace(ROUTES.SALES);
      break;
    case "u":
      router.replace(ROUTES.USERS);
      break;
    case "m":
      router.replace(ROUTES.PROFILE);
      break;
  }
};

/**
Handle update class icon by sort
@param keyColumn: string, sortField: string, sortType: string, type: string
@returns string
*/
export const updateClassIconBySort = ({
  keyColumn,
  sortField,
  sortType,
  typeOfIcon,
}: {
  keyColumn: string;
  sortField: string;
  sortType: string;
  typeOfIcon: string;
}) =>
  sortField === keyColumn && sortType === typeOfIcon
    ? "text-primary"
    : "fill-secondary";

export const isNumber = (value: string) => !isNaN(parseInt(value));

export const debounce = <T>(callback: (params?: T) => void, delay = 1000) => {
  let timer: NodeJS.Timeout;

  return function (params?: T) {
    // Clear the previous timer
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(params);
    }, delay);
  };
};

export const delay = (timeout = 1000) =>
  new Promise(res => {
    setTimeout(res, timeout);
  });

interface ObjectById {
  [key: number]: boolean;
}

export const getSubAttrsByKey = <T extends { [key: string]: any }>(
  arr1: T[],
  arr2: any[],
  key1: string,
  key2: string,
) => {
  let objectEmail: ObjectById = {};

  arr2.forEach(item => {
    objectEmail[item] = true;
  });

  const arr: any = [];

  arr1.forEach(item => {
    if (objectEmail[item[key1]]) {
      arr.push(item[key2]);
    }
  });

  return arr;
};
