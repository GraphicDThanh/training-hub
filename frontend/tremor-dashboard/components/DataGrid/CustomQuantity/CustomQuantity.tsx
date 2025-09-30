import { OrderProduct } from "@/types";

interface QuantityProps {
  products: OrderProduct[];
}

const CustomQuantity = ({ products }: QuantityProps) => (
  <>
    {products?.map(product => (
      <p
        key={product.id}
        className="text-tertiary text-xs dark:text-white font-semibold leading-[15px] tracking-[0.4px] max-w-[50px] lg:max-w-[150px] xl:max-w-[250px] 2xl:max-w-[350px] min-w-[50px] order-product first:pt-0 last:pt-5 first:pb-0 last:pb-0 border-0 dark:border-grayish border-t border-gray-100 first:mb-5 first:border-0">
        {product.count}
      </p>
    ))}
  </>
);

export default CustomQuantity;
