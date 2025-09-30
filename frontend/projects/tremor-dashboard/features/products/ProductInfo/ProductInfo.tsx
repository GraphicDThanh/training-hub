"use client";

// Libs
import dynamic from "next/dynamic";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  ChangeEvent,
  ClipboardEventHandler,
  KeyboardEvent,
  useState,
} from "react";

// Components
import { Text } from "@tremor/react";
import { InputField, SelectField } from "@/components";

// Constants
import {
  PRODUCT_CATEGORY,
  MESSAGES_ERROR,
  EXCEPT_KEYS,
  MESSAGES_WARNING,
  REGEX,
  QUANTITY_LIMIT,
  WEIGHT_LIMIT,
} from "@/constants";

// Types
import { ProductBasicInfo } from "@/types";

// Css
import "@/styles/form.css";
import "react-quill/dist/quill.snow.css";
import "@/styles/quill.css";

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[300px] w-full">
      <Text className="font-semibold text-secondary dark:text-white">
        Loading Quill Editor ...
      </Text>
    </div>
  ),
});

interface ProductInfoProps {
  control: Control<ProductBasicInfo>;
  errors: FieldErrors<ProductBasicInfo>;
}

const ProductInfo = ({ control, errors }: ProductInfoProps) => {
  const [warningQuantityMsg, setWarningQuantityMsg] = useState("");
  const [warningWeightMsg, setWarningWeightMsg] = useState("");

  const errorNameMsg = errors.productName?.message;
  const errorWeightMsg = errors.weight?.message;
  const errorQuantityMsg = errors.quantity?.message;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    EXCEPT_KEYS.POSITIVE_INTEGER.includes(e.key) && e.preventDefault();
  };

  const onPaste: ClipboardEventHandler<HTMLInputElement> = e => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start p-4 bg-white dark:bg-dark-tremor-primary rounded-lg shadow-box-icon-default auto-rows-min h-full">
      <Controller
        name="productName"
        control={control}
        rules={{
          required: MESSAGES_ERROR.FIELD_REQUIRED,
          minLength: {
            value: 4,
            message: MESSAGES_ERROR.MIN_LENGTH_4,
          },
          pattern: {
            value: REGEX.NAME,
            message: MESSAGES_ERROR.NAME_INVALID,
          },
        }}
        render={({ field: { value, onChange, ...rest } }) => (
          <div className="min-h-20">
            <InputField
              id="add-product-name"
              data-testid="add-product-name"
              label="Name"
              required={true}
              errorMessage={errorNameMsg}
              value={value}
              onChange={onChange}
              {...rest}
            />
          </div>
        )}
      />

      {/* Prevent input e, E, +, - to weight field */}
      <Controller
        name="weight"
        control={control}
        rules={{
          max: {
            value: WEIGHT_LIMIT,
            message: MESSAGES_ERROR.PRODUCT.WEIGHT_LIMIT,
          },
        }}
        render={({ field }) => {
          if (errorWeightMsg) setWarningWeightMsg("");

          const handleWeightBlur = (event: ChangeEvent<HTMLInputElement>) => {
            const value = parseInt(event.target.value);

            !errorWeightMsg &&
              setWarningWeightMsg(
                !value
                  ? MESSAGES_WARNING.PRODUCT.WEIGHT_IS_ZERO
                  : value > WEIGHT_LIMIT
                    ? MESSAGES_ERROR.PRODUCT.WEIGHT_LIMIT
                    : "",
              );
          };

          return (
            <div className="min-h-20">
              <InputField
                id="add-product-weight"
                data-testid="add-product-weight"
                type="number"
                label="Weight"
                min={0}
                {...field}
                errorMessage={errorWeightMsg}
                onKeyDown={handleKeyDown}
                onBlur={handleWeightBlur}
                onPaste={onPaste}
              />
              {warningWeightMsg && (
                <Text className="pt-1 text-xs text-yellow-700 dark:text-yellow-500">
                  {warningWeightMsg}
                </Text>
              )}
            </div>
          );
        }}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <div className="w-full mb-2">
            <Text className="text-grey text-sm dark:text-lighter">
              Description <span className="text-xs">(optional)</span>
            </Text>
            <QuillEditor
              theme="snow"
              placeholder="Some initial bold text"
              className="mt-3 dark:text-white"
              {...field}
            />
          </div>
        )}
      />

      <div className="flex flex-col">
        <div className="min-h-[70px]">
          <Controller
            name="category"
            control={control}
            render={({ field: { value, onChange } }) => {
              const convertedValue = value.toString();
              return (
                <SelectField
                  label="Category"
                  data-testid="category"
                  options={PRODUCT_CATEGORY}
                  value={convertedValue}
                  onChange={onChange}
                />
              );
            }}
          />
        </div>

        <div className="min-h-20">
          <Controller
            name="quantity"
            control={control}
            rules={{
              max: {
                value: QUANTITY_LIMIT,
                message: MESSAGES_ERROR.PRODUCT.QUANTITY_LIMIT,
              },
            }}
            render={({ field }) => {
              if (errorQuantityMsg) setWarningQuantityMsg("");

              const handleQuantityBlur = (
                event: ChangeEvent<HTMLInputElement>,
              ) => {
                const value = parseInt(event.target.value);

                !errorQuantityMsg &&
                  setWarningQuantityMsg(
                    !value
                      ? MESSAGES_WARNING.PRODUCT.QUANTITY_IS_ZERO
                      : value > QUANTITY_LIMIT
                        ? MESSAGES_ERROR.PRODUCT.QUANTITY_LIMIT
                        : "",
                  );
              };

              return (
                <div>
                  <InputField
                    id="add-product-quantity"
                    data-testid="add-product-quantity"
                    type="number"
                    label="Quantity"
                    min={0}
                    onKeyDown={handleKeyDown}
                    errorMessage={errorQuantityMsg}
                    {...field}
                    onBlur={handleQuantityBlur}
                    onPaste={onPaste}
                  />
                  {warningQuantityMsg && (
                    <Text className="pt-1 text-xs text-yellow-700 dark:text-yellow-500">
                      {warningQuantityMsg}
                    </Text>
                  )}
                </div>
              );
            }}
          />
        </div>

        <div className="min-h-20 mt-4">
          <Controller
            name="providerName"
            control={control}
            render={({ field }) => (
              <InputField
                id="add-product-provider"
                label="Provider Name"
                {...field}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
