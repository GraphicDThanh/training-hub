// Constants
import { AGGREGATION_TYPE } from "@/constants";
import { BillingInfoData } from "@/types";

export const MOCK_SALARY_DATA = [
  {
    type: AGGREGATION_TYPE.SALARY,
    value: 2000,
  },
  {
    type: AGGREGATION_TYPE.PAYPAL,
    value: 45500,
  },
];

export const MOCK_BILLING_CARD = {
  expire: "11/24",
  cardNumber: "4562 1122 4594 7866",
  holderFullName: "Jack Peterson",
  cardLast4Digit: "7866",
};

export const MOCK_BILLING_INFO: BillingInfoData = {
  id: "1",
  ownerName: "Oliver Liam",
  companyName: "Viking Burrito",
  cardLast4Digit: "1234",
  email: "oliver@burrito.com",
  vat: "FRB1235476",
};

export const MOCK_BILLING: BillingInfoData[] = [
  {
    id: "1",
    ownerName: "Oliver Liam",
    companyName: "Viking Burrito",
    cardLast4Digit: "1234",
    email: "oliver@burrito.com",
    vat: "FRB1235476",
  },
  {
    id: "2",
    ownerName: "Oliver Liam",
    companyName: "Viking Burrito",
    cardLast4Digit: "1234",
    email: "oliver@burrito.com",
    vat: "FRB1235476",
  },
  {
    id: "3",
    ownerName: "Oliver Liam",
    companyName: "Viking Burrito",
    cardLast4Digit: "1234",
    email: "oliver@burrito.com",
    vat: "FRB1235476",
  },
];
