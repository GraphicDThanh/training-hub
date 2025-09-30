import { Invoice } from "@/types";

export const MOCK_INVOICE_DATA = {
  id: 230220,
  createdAt: "06/03/2019",
  dueAt: "11/03/2019",
  bankInfo: {
    address: "St. Independence Embankment, 050105",
    city: "Bucharest",
    state: "Romania",
    phone: "+4 (074) 1090873",
  },
  customer: {
    fullName: "John Doe",
    address: "4006 Locust View Drive",
    city: "San Francisco",
    stateCode: "CA",
    state: "California",
  },
  products: [
    {
      id: 1,
      productName: "Premium Support",
      quantity: 1,
      price: 9,
    },
    {
      id: 2,
      productName: "Metro Dashboard",
      quantity: 3,
      price: 100,
    },
    {
      id: 3,
      productName: "Parts for service",
      quantity: 2,
      price: 10,
    },
  ],
  totalCost: 345,
};

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 804322,
    createdAt: "March, 21, 2021",
    invoicePrefix: "AR",
    totalCost: 180,
  },
  {
    id: 8908543,
    createdAt: "Apr, 22, 2022",
    invoicePrefix: "AR",
    totalCost: 180,
  },
  {
    id: 415645,
    createdAt: "May, 23, 2023",
    invoicePrefix: "MS",
    totalCost: 180,
  },
  {
    id: 103578,
    createdAt: "Jun, 24, 2024",
    invoicePrefix: "QW",
    totalCost: 180,
  },
  {
    id: 126749,
    createdAt: "Jul, 25, 2025",
    invoicePrefix: "RV",
    totalCost: 180,
  },
];

export const MOCK_INVOICE_HEADER = {
  addressBank: "St. Independence Embankment, 050105",
  cityBank: "Bucharest",
  stateBank: "Romania",
  phoneBank: "+4 (074) 1090873",
  fullName: "John Doe",
  addressCustomer: "4006 Locust View Drive",
  cityCustomer: "San Francisco",
  stateCode: "CA",
  stateCustomer: "California",
};

//addressBank: string;
//cityBank: string;
//stateBank: string;
//phoneBank: string;
//fullName: string;
//addressCustomer: string;
//cityCustomer: string;
//stateCode: string;
//stateCustomer: string;

//id: number;
//createdAt: string;
//orderCode: string; }> & {
// id?: number | undefined;
//createdAt?: string | undefined;
//orderCode?: string | undefined;
