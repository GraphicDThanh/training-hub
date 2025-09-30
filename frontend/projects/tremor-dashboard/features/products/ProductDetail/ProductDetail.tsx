import Link from "next/link";
import { Flex } from "@tremor/react";
import { memo } from "react";

// Components
import { CustomImage } from "@/components";
import { ProductInfoDetail } from "@/features/products";

// Constants
import { ROUTES } from "@/constants";

// Types
import { Product } from "@/types";

const ProductDetail = ({
  id,
  productName,
  price,
  image,
  description = "",
  quantity = 0,
}: Product) => {
  return (
    <Flex
      alignItems="start"
      flexDirection="col"
      justifyContent="start"
      className="lg:flex-row"
      as="section">
      <Flex className="lg:w-[30%] relative h-[350px]">
        <CustomImage
          className="rounded-lg lg:w-full lg:h-full object-scale-down"
          priority
          src={image}
          fill
          quality={40}
          alt="product-detail"
        />
      </Flex>
      <Flex
        alignItems="start"
        justifyContent="start"
        flexDirection="col"
        className="lg:px-[100px] pt-6 lg:pt-0 lg:w-[70%]">
        <ProductInfoDetail
          price={price}
          productName={productName}
          description={description}
          quantity={quantity}
        />
        <Link
          href={`${ROUTES.PRODUCTS}/${id}/edit-product`}
          className="rounded-lg uppercase font-bold text-xs text-white dark:bg-gradient-pickled py-3 px-5 mt-8 bg-gradient-primary shadow-btn-primary hover:shadow-btn-primary-hover hover:dark:bg-gradient-pickled border-none dark:text-white w-full lg:w-auto text-center tracking-wide">
          Edit Product
        </Link>
      </Flex>
    </Flex>
  );
};

export default memo(ProductDetail);
