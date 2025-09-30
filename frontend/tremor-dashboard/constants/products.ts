// Types
import { OptionType, TFieldSocial } from "@/types";

type TopSellingProductsType = {
  [key: number]: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
};

export const TOP_SELLING_PRODUCTS_IMAGE: TopSellingProductsType = {
  1: "/assets/images/products/blue-shoe.webp",
  2: "/assets/images/products/black-mug.webp",
  3: "/assets/images/products/black-chair.webp",
  4: "/assets/images/products/bang-sound.webp",
  5: "/assets/images/products/photo-tools.webp",
};

export const PRICE_TYPE: OptionType[] = [
  {
    option: "BTC",
    value: "1",
  },
  {
    option: "CNY",
    value: "2",
  },
  {
    option: "EUR",
    value: "3",
  },
  {
    option: "GBP",
    value: "4",
  },
  {
    option: "INR",
    value: "5",
  },
  {
    option: "USD",
    value: "6",
  },
];

export const PRICE_TAGS: OptionType[] = [
  {
    option: "Black Friday",
    value: "1",
  },
  {
    option: "Expired",
    value: "2",
  },
  {
    option: "Sale",
    value: "3",
  },
];

export const PRODUCT_CATEGORY: OptionType[] = [
  {
    option: "Clothing",
    value: "1",
  },
  {
    option: "Electronics",
    value: "2",
  },
  {
    option: "Furniture",
    value: "3",
  },
  {
    option: "Others",
    value: "4",
  },
  {
    option: "Real Estate",
    value: "5",
  },
];

export const OTHER_PRODUCTS_LENGTH = 4;

export const SOCIAL_PRODUCTS: TFieldSocial[] = [
  {
    id: "shopifyUrl",
    name: "shopifyUrl",
    label: "Shopify Handle",
    value: "",
  },
  {
    id: "facebookUrl",
    name: "facebookUrl",
    label: "Facebook Account",
    value: "",
  },
  {
    id: "instagramUrl",
    name: "instagramUrl",
    label: "Instagram Account",
    value: "",
  },
];
