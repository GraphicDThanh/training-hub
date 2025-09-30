// Components
import { OtherProducts } from "@/features/products";
import { Product } from "@/types";

const OtherProductList = async ({ products }: { products: Product[] }) => (
  <OtherProducts products={products} />
);

export default OtherProductList;
