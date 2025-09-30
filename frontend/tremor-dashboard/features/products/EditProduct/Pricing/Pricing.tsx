"use client";

// Libs
import { Controller, useFormContext } from "react-hook-form";
import { KeyboardEvent } from "react";

// Components
import { Text, Flex, MultiSelect, MultiSelectItem } from "@tremor/react";
import { InputField } from "@/components";

// Utils
import { formatAmountNumber, validateWithCurrencyLimit } from "@/helpers";

// Types
import { OptionType } from "@/types";

// Constants
import {
  PRICE_TAGS,
  NUMBER_REGEX,
  MESSAGES_ERROR,
  EXCEPT_KEYS,
} from "@/constants";

// Styles
import "@/styles/form.css";

// Hooks
import useFocusFieldError from "@/hooks/useFocusFieldError";
import { PRICE_LIMIT } from "@/constants/common";

const PricingInfo = () => {
  const { control, formState } = useFormContext();

  useFocusFieldError(formState);

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    EXCEPT_KEYS.POSITIVE_DOUBLE.includes(e.key) && e.preventDefault();
  };

  return (
    <div className="w-full h-full p-4 bg-white dark:bg-dark-tremor-primary rounded-lg w-[67%] shadow-box-icon-default pricing-info">
      <Text className="text-primary dark:text-white font-bold text-xl mb-6">
        Pricing
      </Text>
      <Flex flexDirection="col" alignItems="end">
        <Flex alignItems="start" flexDirection="col" className="sm:flex-row">
          <Flex flexDirection="col">
            <Flex flexDirection="col" className="sm:flex-row">
              <Controller
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
                    <div className="w-full min-h-20">
                      <InputField
                        id="edit-price"
                        data-testid="edit-price"
                        placeholder="0,00"
                        contentPrefix="$"
                        classCustomInput="pl-[15px]"
                        label="Price"
                        required={true}
                        errorMessage={priceErrorMessage}
                        onKeyDown={handleOnKeyDown}
                        value={formatAmountNumber(value.toString())}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    </div>
                  );
                }}
                name="price"
              />
              <Controller
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
                    <div className="w-full sm:ml-6 min-h-20">
                      <InputField
                        id="edit-sku"
                        data-testid="edit-sku"
                        label="SKU"
                        name={name}
                        errorMessage={skuErrorMessage}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    </div>
                  );
                }}
                name="sku"
              />
            </Flex>

            <Controller
              control={control}
              render={({ field: { value, onChange } }) => {
                const convertedValue = value?.map(String);
                return (
                  <div className="w-full min-h-20">
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
              name="tags"
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default PricingInfo;
