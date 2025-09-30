"use client";

import { memo } from "react";
import isEqual from "react-fast-compare";
import { Controller, useForm } from "react-hook-form";
import { Flex, Text } from "@tremor/react";

// Constants
import { MESSAGES_ERROR, VARIANT_BUTTON, AMOUNT_LIMIT } from "@/constants";

// Types
import { NewTransaction, OptionType } from "@/types";

// Icons
import { BsCurrencyDollar } from "react-icons/bs";

// Components
import { DecimalNumberInputGroup, Button, SelectDebounce } from "@/components";

// Helpers
import { validateCurrencyWithRules } from "@/helpers";

interface TransactionFormProps {
  options: OptionType[];
  isLoadingTransaction?: boolean;
  onSubmit: (payload: NewTransaction) => void;
  onClose?: () => void;
  handleShowErrorMessageFromAPI?: (error: string) => void;
}

const TransactionForm = ({
  options,
  isLoadingTransaction = false,
  onSubmit,
  onClose,
  handleShowErrorMessageFromAPI,
}: TransactionFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<NewTransaction>({ mode: "onBlur" });

  return (
    <form
      data-testid="createTransactionForm"
      id="createTransactionForm"
      className="flex flex-col gap-5 "
      onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        rules={{
          required: MESSAGES_ERROR.FIELD_REQUIRED,
        }}
        name="toUserId"
        render={({ field: { value, onChange, ...rest } }) => {
          const handleChange = (value: string) => {
            handleShowErrorMessageFromAPI?.("");
            onChange(value);
          };
          return (
            <SelectDebounce
              data-testid="toUserId"
              id="toUserId"
              value={value}
              options={options}
              placeholder="Choose an account to transfer"
              onValueChange={handleChange}
              {...rest}
            />
          );
        }}
      />
      <Controller
        control={control}
        rules={{
          required: MESSAGES_ERROR.FIELD_REQUIRED,
          min: {
            value: 1,
            message: MESSAGES_ERROR.TRANSACTION.MIN_AMOUNT,
          },
          validate: (value: string) =>
            validateCurrencyWithRules(
              value,
              { valueLimit: AMOUNT_LIMIT, minValue: 0 },
              {
                limit: MESSAGES_ERROR.TRANSACTION.AMOUNT_LIMIT,
                min: MESSAGES_ERROR.TRANSACTION.MIN_AMOUNT,
              },
            ),
        }}
        name="amount"
        render={({
          field: { value = "", onChange, ...rest },
          fieldState: { error },
        }) => {
          const handleChangeCurrencyInput = (value?: string) => {
            handleShowErrorMessageFromAPI?.("");
            onChange(value);
          };

          return (
            <DecimalNumberInputGroup
              errorMessage={error?.message}
              value={value}
              icon={<BsCurrencyDollar />}
              label="Enter amount"
              {...rest}
              onChangeCurrencyInput={handleChangeCurrencyInput}
            />
          );
        }}
      />
      <Flex justifyContent="evenly" className="flex gap-5">
        <Button
          type="submit"
          loading={isLoadingTransaction}
          variant={VARIANT_BUTTON.PRIMARY}
          disabled={!isValid || isSubmitting}
          additionalClass="flex-1 min-w-[64px] text-center uppercase sm:px-[22px] px-6 py-2.5 rounded-lg border-0">
          <Text className="flex items-center uppercase py-[2px] text-xs font-bold text-white dark:text-dark-tremor-content-title tracking-wide">
            Submit
          </Text>
        </Button>
        <Button
          variant={VARIANT_BUTTON.SURFACE}
          onClick={onClose}
          disabled={isSubmitting}
          additionalClass="mt-0 flex flex-1">
          <Text className="uppercase font-bold text-xs text-gray-900 dark:text-black tracking-wide">
            Cancel
          </Text>
        </Button>
      </Flex>
    </form>
  );
};

export default memo(TransactionForm, isEqual);
