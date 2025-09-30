"use client";

import { ReactNode, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";

// Tremor
import { Flex, Dialog, DialogPanel, Text } from "@tremor/react";
import { Button } from "@/components";

// Tailwind
import { twMerge } from "tailwind-merge";
import { VARIANT_BUTTON } from "@/constants";

export interface IModal {
  id?: string;
  title?: string;
  children: ReactNode;
  open?: boolean;
  showCloseIconBtn?: boolean;
  showBtnCloseLabel?: boolean;
  additionalClasses?: string;
  btnCloseLabel?: string;
  btnPrimaryLabel?: string;
  btnSecondaryLabel?: string;
  onClose?: () => void;
  onClickPrimaryBtn?: () => void | Promise<void>;
  onClickSecondaryBtn?: () => void | Promise<void>;
  primaryBtnDisabled?: boolean;
  secondaryBtnDisabled?: boolean;
}

const Modal = ({
  id = "",
  title,
  children,
  open = true,
  showCloseIconBtn = false,
  showBtnCloseLabel = true,
  additionalClasses = "",
  btnCloseLabel = "Cancel",
  btnPrimaryLabel = "Submit",
  btnSecondaryLabel = "Done",
  primaryBtnDisabled = false,
  secondaryBtnDisabled,
  onClickPrimaryBtn,
  onClickSecondaryBtn,
  onClose,
  ...rest
}: Readonly<IModal>) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} id={id} {...rest}>
      <DialogPanel
        className={twMerge(
          "rounded-md border-none outline-none flex flex-col gap-8 sm:min-w-[80%] md:min-w-[500px] bg-tremor-primary dark:bg-dark-tremor-primary",
          additionalClasses,
        )}>
        {showCloseIconBtn && (
          <Flex justifyContent="end">
            <GrClose
              className="h-5 w-5 shrink-0 text-xl text-tertiary"
              data-testid="close-modal-btn"
              onClick={handleClose}
              aria-label="Close"
              cursor="pointer"
            />
          </Flex>
        )}

        {title && (
          <h2 className="text-primary dark:text-white font-bold text-2xl text-center">
            {title}
          </h2>
        )}

        {children}

        <Flex justifyContent="evenly" className="gap-5">
          {onClickPrimaryBtn && btnPrimaryLabel.length > 0 && (
            <Button
              onClick={onClickPrimaryBtn}
              variant={VARIANT_BUTTON.PRIMARY}
              disabled={primaryBtnDisabled}
              additionalClass="flex-1 min-w-[64px] sm:px-[22px]">
              <Text className="flex items-center uppercase py-[2px] text-xs font-bold text-white dark:text-dark-tremor-content-title tracking-wide">
                {btnPrimaryLabel}
              </Text>
            </Button>
          )}

          {onClickSecondaryBtn && btnSecondaryLabel.length > 0 && (
            <Button
              variant={VARIANT_BUTTON.SURFACE}
              type="submit"
              additionalClass="flex-1"
              onClick={onClickSecondaryBtn}>
              <Text className="uppercase font-bold text-xs text-white dark:text-black tracking-wide">
                {btnSecondaryLabel}
              </Text>
            </Button>
          )}

          {showBtnCloseLabel && (
            <Button
              variant={VARIANT_BUTTON.SURFACE}
              type="submit"
              data-testid="btn-close-modal"
              onClick={handleClose}
              disabled={secondaryBtnDisabled}
              additionalClass="mt-0 flex-1">
              <Text className="uppercase font-bold text-xs text-gray-900 dark:text-black tracking-wide">
                {btnCloseLabel}
              </Text>
            </Button>
          )}
        </Flex>
      </DialogPanel>
    </Dialog>
  );
};

export default Modal;
