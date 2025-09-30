"use client";

// Libs
import { useForm } from "react-hook-form";

// Components
import { Text } from "@tremor/react";
import { ProductInfo } from "@/features/products";

// Types
import { ProductBasicInfo } from "@/types";
import { Button } from "@/components";

// Constants
import { VARIANT_BUTTON } from "@/constants";

interface ProductInfoFormProps {
  productName: string;
  description: string;
  providerName: string;
  weight: number;
  category: number;
  quantity: number;
  onSubmit: (data: ProductBasicInfo) => void;
}

const ProductInfoForm = ({
  productName,
  description,
  providerName,
  weight,
  category,
  quantity,
  onSubmit,
}: ProductInfoFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductBasicInfo>({
    defaultValues: {
      productName,
      description,
      providerName,
      weight,
      category,
      quantity,
    },
    mode: "onBlur",
  });

  return (
    <form
      className="w-full mt-20 product-info"
      id="product-info-form"
      onSubmit={handleSubmit(onSubmit)}>
      <h4 className="text-lg text-primary dark:text-white font-bold mb-8">
        Product Information
      </h4>
      <ProductInfo control={control} errors={errors} />
      <div className="mt-6">
        <Button
          variant={VARIANT_BUTTON.PRIMARY}
          additionalClass="float-right"
          type="submit"
          data-testid="submit-product-info">
          <Text className="uppercase font-bold text-xs text-white dark:text-white tracking-wide">
            Next
          </Text>
        </Button>
      </div>
    </form>
  );
};

export default ProductInfoForm;
