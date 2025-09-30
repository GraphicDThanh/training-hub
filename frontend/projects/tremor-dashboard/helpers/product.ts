import { Product } from "@/types";

export const getOtherProducts = (
  products: Product[],
  id: number,
  length: number,
) => {
  const productsLength = products.length;
  const otherProducts: Product[] = [];

  for (let i = 0; i < productsLength; i++) {
    const product = products[i];
    if (product.id.toString() !== id.toString()) otherProducts.push(product);
    if (otherProducts.length === length) break;
  }

  return otherProducts;
};
