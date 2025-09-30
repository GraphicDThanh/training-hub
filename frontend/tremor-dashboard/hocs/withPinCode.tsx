"use client";

import { useCallback, useState } from "react";

import { usePinCode } from "@/context/pincode";

import { PinCodeModal } from "@/components";

import { updatePinCode } from "@/services";

import { PIN_CODE_SKIP_SET_KEY } from "@/constants";

export type TWithPinCode<T> = {
  onOpenPinCodeModal: (onConfirm?: () => void) => void;
  onClosePinCodeModal: () => void;
} & T;

const ON_CONFIRM_DEFAULT = function () {};

let confirmCallBack = ON_CONFIRM_DEFAULT;

export const withPinCode = <T,>(
  ChildComponent: (props: TWithPinCode<T>) => JSX.Element,
) => {
  const WithPinCodeModalWrapper = (props: T) => {
    const [isOpen, setIsOpen] = useState(false);
    const { pinCode, setPinCode } = usePinCode();
    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = useCallback(() => {
      !pinCode && localStorage.setItem(PIN_CODE_SKIP_SET_KEY, "true");
      setIsOpen(false);
      confirmCallBack = ON_CONFIRM_DEFAULT;
      setErrorMessage("");
    }, [pinCode]);

    const handleOpen = useCallback((onConfirm?: () => void) => {
      setIsOpen(true);
      confirmCallBack = onConfirm ?? ON_CONFIRM_DEFAULT;
    }, []);

    const handleConfirm = useCallback(
      (codes: string) => {
        if (!pinCode || pinCode == codes) {
          setIsOpen(false);

          if (!pinCode) {
            updatePinCode(codes);
            setPinCode(codes);
          }

          confirmCallBack?.();
          setErrorMessage("");
          return;
        }

        setErrorMessage("PIN code not match!");
      },

      [pinCode, setPinCode],
    );

    const handleFocus = useCallback(() => {
      setErrorMessage("");
    }, []);

    const modalProps = pinCode
      ? { title: "Enter your PIN code" }
      : {
          title: "Set your PIN code",
          btnCloseLabel: "Skip",
          btnPrimaryLabel: "Set",
        };

    return (
      <>
        <ChildComponent
          onClosePinCodeModal={handleClose}
          onOpenPinCodeModal={handleOpen}
          {...props}
        />
        {isOpen && (
          <PinCodeModal
            {...modalProps}
            onSubmit={handleConfirm}
            onClose={handleClose}
            data-testid="modal-pincode"
            errorMessage={errorMessage}
            onFocus={handleFocus}
          />
        )}
      </>
    );
  };

  return WithPinCodeModalWrapper;
};
