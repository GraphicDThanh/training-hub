// Components
import { StarRating } from "@/components";
import { Text, Flex } from "@tremor/react";

// Constants
import { CURRENCY } from "@/constants";

// Helpers
import { moneyFormat } from "@/helpers";

export type TProductInfoDetail = {
  productName: string;
  price: number;
  description?: string;
  quantity?: number;
};

const ProductInfoDetail = ({
  productName,
  price,
  quantity,
  description,
}: TProductInfoDetail) => {
  const quantityValue = quantity === 0 ? "Out Of Stock" : "In Stock";
  const quantityStyle =
    quantity === 0
      ? "text-white bg-red-600 dark:text-white dard:bg-red-400"
      : "text-fewer bg-seldom dark:text-fewer";

  return (
    <Flex
      flexDirection="col"
      alignItems="start"
      className="antialiased font-primary lg:w-80%">
      <h2 className="text-primary dark:text-white font-bold text-3xl mb-3">
        {productName}
      </h2>
      <StarRating />
      <Flex
        flexDirection="col"
        alignItems="start"
        justifyContent="start"
        className="mt-5">
        <Text className="text-tremor-title font-semibold text-primary dark:text-white">
          Price
        </Text>
        <Flex
          flexDirection="col"
          alignItems="start"
          className="text-xl font-semibold font-primary text-primary dark:text-white"
          data-testid="total-price">
          {moneyFormat({
            value: price,
            currency: CURRENCY.DOLLAR,
          })}
        </Flex>
      </Flex>
      <Text
        className={`p-2 mt-4 font-bold text-xs rounded-tremor-small leading-[9px] tracking-[0.18px] uppercase ${quantityStyle}`}>
        {quantityValue}
      </Text>
      {description && (
        <Flex flexDirection="col" alignItems="start" className="mt-10">
          <Text className="text-tertiary dark:text-lighter mb-4">
            Description
          </Text>
          <div
            className="text-tertiary dark:text-lighter max-h-[240px] overflow-auto no-scrollbar"
            dangerouslySetInnerHTML={{ __html: description! }}
          />
        </Flex>
      )}
      <Flex flexDirection="col" alignItems="start" className="mt-10">
        <Text className="text-tertiary dark:text-lighter mb-4">Quantity</Text>
        <Text>{quantity}</Text>
      </Flex>
    </Flex>
  );
};

export default ProductInfoDetail;
