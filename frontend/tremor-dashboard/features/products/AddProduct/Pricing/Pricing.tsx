// Libs
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { Control, Controller } from "react-hook-form";
import { KeyboardEvent } from "react";

// Components
import { InputField } from "@/components";

// Constants
import {
  PRICE_TAGS,
  EXCEPT_KEYS,
  MESSAGES_ERROR,
  PRICE_LIMIT,
  NUMBER_REGEX,
} from "@/constants";

// Types
import { NewPricing, OptionType } from "@/types";

// Utils
import { formatAmountNumber, validateWithCurrencyLimit } from "@/helpers";

interface PricingProps {
  control: Control<NewPricing>;
}

const Pricing = ({ control }: PricingProps) => {
  const handlePriceKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    EXCEPT_KEYS.POSITIVE_DOUBLE.includes(e.key) && e.preventDefault();
  };

  const handleSkuKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    EXCEPT_KEYS.POSITIVE_INTEGER.includes(e.key) && e.preventDefault();
  };

  return (
    <div className="flex flex-col">
      <Controller
        name="price"
        control={control}
        rules={{
          required: MESSAGES_ERROR.FIELD_REQUIRED,
          validate: value =>
            validateWithCurrencyLimit(
              value.toString(),
              PRICE_LIMIT,
              MESSAGES_ERROR.PRODUCT.PRICE_LIMIT,
            ),
        }}
        render={({
          field: { value, onChange, onBlur },
          formState: { errors },
        }) => {
          const priceErrorMessage = errors.price?.message?.toString();

          return (
            <div className="min-h-20">
              <InputField
                id="add-product-price"
                data-testid="add-price"
                label="Price"
                contentPrefix="$"
                classCustomInput="pl-[15px]"
                placeholder="0,00"
                required={true}
                onKeyDown={handlePriceKeyDown}
                errorMessage={priceErrorMessage}
                value={formatAmountNumber(value.toString())}
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
          );
        }}
      />

      <Controller
        name="sku"
        control={control}
        rules={{
          pattern: {
            value: NUMBER_REGEX,
            message: MESSAGES_ERROR.SKU_INVALID,
          },
        }}
        render={({
          field: { name, onChange, onBlur },
          formState: { errors },
        }) => {
          const skuErrorMessage = errors.sku?.message?.toString();

          return (
            <div className="min-h-20">
              <InputField
                id="add-product-sku"
                data-testid="add-sku"
                label="SKU"
                name={name}
                errorMessage={skuErrorMessage}
                onKeyDown={handleSkuKeyDown}
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
          );
        }}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field: { value, onChange } }) => {
          const convertedValue = value.map(String);

          return (
            <div className="min-h-20">
              <label
                htmlFor="tags"
                className="text-gray-500 text-sm dark:text-gray-400">
                Tags
              </label>
              <MultiSelect
                className="select-custom select-multi dark:text-white dark:border-light dark:focus:border-white"
                value={convertedValue}
                onValueChange={onChange}>
                {PRICE_TAGS.map((item: OptionType) => (
                  <MultiSelectItem key={item.value} value={item.value}>
                    {item.option}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Pricing;
