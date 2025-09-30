import { OrderProduct } from "@/types";

interface CustomListProps {
  products: OrderProduct[];
  className?: string;
}

const CustomList = ({ products, className = "w-[180px]" }: CustomListProps) => (
  <>
    {!!products.length &&
      products.map(product => (
        <p
          data-testid="order-product"
          key={product.id}
          className={`text-tertiary text-xs dark:text-lighter font-semibold leading-[15px] tracking-[0.4px] truncate order-product first:pt-0 last:pt-5 first:pb-0 last:pb-0 border-0 dark:border-grayish border-t border-gray-100 first:mb-5 first:border-0 ${className}`}>
          {product.name}
        </p>
      ))}
  </>
);

export default CustomList;
