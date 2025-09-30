"use client";

import { KeyboardEvent, forwardRef, memo, useState } from "react";

import { PIN_CODE_DEFAULT, KEYBOARD_KEYS } from "@/constants";

import "./style.css";
import { isNumber } from "@/helpers";

export interface IPinCodeField {
  index: number;
  value?: string;
  onChange: (value: string, index: number) => void;
  autoFocus?: boolean;
  onFocus?: () => void;
}

export const PinCodeField = memo(
  forwardRef<HTMLInputElement, IPinCodeField>(
    ({ index, value = "", autoFocus = false, onFocus, onChange }, ref) => {
      const [currentValue, setCurrentValue] = useState(value);
      const [isFocus, setIsFocus] = useState(autoFocus);

      const handleFocus = () => {
        onFocus?.();
        setIsFocus(true);
      };

      const handleBlur = () => {
        setIsFocus(false);
      };

      const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;

        const { BACKSPACE } = KEYBOARD_KEYS;

        if (key === BACKSPACE) {
          onChange(PIN_CODE_DEFAULT, index);
          setCurrentValue(PIN_CODE_DEFAULT);
          return;
        }

        if (key !== "e" && isNumber(key)) {
          onChange(key, index);
          setCurrentValue(key);
          return;
        }

        e.preventDefault();
      };

      return (
        <input
          data-testid="pin-code-input"
          ref={ref}
          value={isFocus || value === PIN_CODE_DEFAULT ? "" : currentValue}
          onChange={() => {}}
          autoFocus={autoFocus}
          type={"password"}
          inputMode="numeric"
          placeholder="○"
          maxLength={1}
          className={`w-8 sm:w-full h-8 sm:h-10 border-2 rounded-md outline-none border-secondary focus:border-tremor-secondary text-center font-bold text-2xl text-primary dark:text-white placeholder-secondary focus:placeholder-transparent dark:bg-transparent dark:border-white focus:dark:border-tremor-secondary dark:placeholder-white focus:dark:placeholder-transparent${
            isFocus ? " focused" : ""
          }`}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      );
    },
  ),
);
