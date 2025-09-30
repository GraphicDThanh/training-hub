"use client";

import { createRef, memo, useCallback, RefObject } from "react";

import { Flex } from "@tremor/react";
import { PinCodeField } from "./PinCodeField";
import { ErrorMessage } from "@/components";

import { rangeNumber, formatPinCode } from "@/helpers";

import { PIN_CODE_DEFAULT, PIN_CODE_LENGTH } from "@/constants";

export interface IPinCode {
  length?: number;
  onChange: (value: string) => void;
  value?: string;
  errorMessage?: string;
  onFocus?: () => void;
}

export const PinCode = memo(
  ({
    length = PIN_CODE_LENGTH,
    value,
    errorMessage,
    onChange,
    onFocus,
  }: IPinCode) => {
    const codes = formatPinCode({ length, codes: value });

    const refs = rangeNumber(1, length).map(() =>
      createRef<HTMLInputElement>(),
    );

    const handleChange = useCallback(
      (value: string, index: number) => {
        const currentCodes = formatPinCode({ codes, index, value });
        onChange(currentCodes);

        if (value === PIN_CODE_DEFAULT) {
          if (index > 0) {
            refs[index - 1].current?.focus();
          }

          return;
        }

        if (index < length - 1) {
          refs[index + 1].current?.focus();
          return;
        }

        refs[index].current?.blur();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [refs, codes, onchange],
    );

    return (
      <div>
        <Flex className="gap-3 sm:gap-6 w-full self-center max-w-[250px] sm:max-w-[360px] m-auto">
          {refs.map((ref: RefObject<HTMLInputElement>, index: number) => (
            <PinCodeField
              ref={ref}
              key={index}
              index={index}
              value={codes[index]}
              onChange={handleChange}
              autoFocus={index === 0}
              onFocus={onFocus}
            />
          ))}
        </Flex>
        {errorMessage && (
          <ErrorMessage
            errorMessage={errorMessage}
            className="mt-2 text-center"
          />
        )}
      </div>
    );
  },
);

PinCode.displayName = "Pin Code";
