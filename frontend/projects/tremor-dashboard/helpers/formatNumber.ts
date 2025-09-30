export const numberWithCommas = (x: number | string): string => {
  x = x.toString();
  let pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};

/**
 *
 * Format phone number by US while typing
 *
 * @param value - the value of input
 * @returns - format value with (868) 686-8686
 */
export const formatPhoneNumber = (value: string): string => {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, "");

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early
  if (phoneNumberLength < 4) return phoneNumber;

  // if phoneNumberLength is greater than 4 and less the 7 we start to return
  // the formatted number
  if (phoneNumberLength < 7)
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;

  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6,
  )}-${phoneNumber.slice(6, 10)}`;
};

/**
 *
 * Function handler converts phone number formatter to phone string normal
 *
 * @param phoneNumber - the value of input when update user success
 * @returns -  convert from (868) 686-8686 -> 8686868686
 */
export const convertPhoneNumberToString = (phoneNumber: string) => {
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  return cleanedPhoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1$2$3");
};

export function formatCreditCard(number: string) {
  return number.replace(/(\d{4})(?=\d)/g, "$1 ");
}
