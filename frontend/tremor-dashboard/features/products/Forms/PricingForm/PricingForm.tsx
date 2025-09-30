// Libs
import { useForm } from "react-hook-form";

// Types
import { NewPricing } from "@/types";

// Components
import { Flex, Text } from "@tremor/react";
import { Pricing } from "@/features/products/AddProduct";
import { Button } from "@/components";

// Constants
import { VARIANT_BUTTON } from "@/constants";

interface PricingFormProps {
  price: number;
  sku: string;
  currency: number;
  tags: number[];
  isLoading: boolean;
  errorMessage?: string;
  onBack: () => void;
  onSubmit: (pricing: NewPricing) => void;
}

const PricingForm = ({
  price,
  sku,
  currency,
  tags,
  isLoading,
  errorMessage,
  onBack,
  onSubmit,
}: PricingFormProps) => {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<NewPricing>({
    defaultValues: {
      price,
      sku,
      currency,
      tags: tags?.map(String),
    },
    mode: "onBlur",
  });

  return (
    <form
      className="w-full mt-20"
      id="pricing-form"
      onSubmit={handleSubmit(onSubmit)}>
      <h6 className="text-primary dark:text-white font-bold text-xl mb-8">
        Pricing
      </h6>
      {errorMessage && (
        <div>
          <Text className="text-md text-red-500 dark:text-red-500 mb-8">
            Please review these error then try again: {errorMessage}
          </Text>
        </div>
      )}
      <Pricing control={control} />
      <Flex className="mt-6">
        <Button
          variant={VARIANT_BUTTON.SURFACE}
          type="submit"
          data-testid="btn-back"
          onClick={onBack}
          disabled={isSubmitting || isLoading}>
          <Text className="uppercase font-bold text-xs text-gray-900 dark:text-black tracking-wide">
            Back
          </Text>
        </Button>
        <Button
          variant={VARIANT_BUTTON.PRIMARY}
          additionalClass="items-end"
          disabled={isSubmitting || isLoading}
          data-testid="btn-send"
          type="submit">
          <Text className="uppercase font-bold text-xs text-white dark:text-white tracking-wide">
            Send
          </Text>
        </Button>
      </Flex>
    </form>
  );
};

export default PricingForm;
