export const REGEX = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
  URL: /(https?:\/\/)?[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}(?:\.[a-zA-Z]{2,})?(?:\/\S*)?/i,
  AMOUNT_PATTERN: /^[0-9]*$/,
  DECIMAL_PATTERN: /^\d*(\.\d{0,2})?$/,
  NAME: /^(?!\s).+(?<!\s)$/,
  PHONE_NUMBER: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
};

export const INVOICE_REGEX = /billing\/\w+/gm;
export const ORDER_LIST_REGEX = /orders\/\w+/gm;
export const PRODUCT_LIST_REGEX = /products\/\w+/gm;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const NUMBER_REGEX = /^\d*[0-9]\d*$/;
export const TYPE_FILE_IMAGE_REGEX = /\.(jpg|jpeg|png|webp)$/i;
