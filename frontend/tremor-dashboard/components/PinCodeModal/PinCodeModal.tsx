"use client";

import React, { memo, useCallback, useState } from "react";

import { PinCode } from "./PinCode";
import { Modal } from "@/components";

import { isValidPinCode } from "@/helpers";

import { IModal } from "../Modal/Modal";
import { PIN_CODE_LENGTH } from "@/constants";

interface IPinCodeModal extends Omit<IModal, "children"> {
  onSubmit: (codes: string) => void | Promise<void>;
  errorMessage?: string;
  onFocus?: () => void;
}

const PinCodeModal = ({
  onSubmit,
  onFocus,
  errorMessage,
  ...others
}: IPinCodeModal) => {
  const [codes, setCodes] = useState("");

  const handleSubmit = useCallback(async () => {
    await onSubmit(codes);
    setCodes("");
  }, [codes, onSubmit]);

  return (
    <Modal
      additionalClasses="md:min-w-[390px] w-[calc(100%-8px)] md:max-w-[390px]"
      primaryBtnDisabled={!isValidPinCode(codes, PIN_CODE_LENGTH)}
      onClickPrimaryBtn={handleSubmit}
      id="pincode-modal"
      {...others}>
      <PinCode
        length={PIN_CODE_LENGTH}
        onChange={setCodes}
        value={codes}
        errorMessage={errorMessage}
        onFocus={onFocus}
      />
    </Modal>
  );
};

export default memo(PinCodeModal);
