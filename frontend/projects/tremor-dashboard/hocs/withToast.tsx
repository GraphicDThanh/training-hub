"use client";

import React, { ReactNode, useState } from "react";

import { LoadingPage, Toast } from "@/components";
import { RxCross2 } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import { TbExclamationMark } from "react-icons/tb";

export enum TOAST_TYPE {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export const buildToastRenderer = ({ type, icon, message }: ToastProps) => {
  switch (type) {
    case TOAST_TYPE.WARNING:
      return {
        icon: icon || <TbExclamationMark />,
        message: message ?? "Warning!",
        color: "yellow",
      };

    case TOAST_TYPE.ERROR:
      return {
        icon: icon || <RxCross2 />,
        message: message ?? "Error!",
        color: "red",
      };

    case TOAST_TYPE.SUCCESS:
    default:
      return {
        icon: icon || <FaCheckCircle />,
        message: message ?? "Success!",
        color: "green",
      };
  }
};
export interface ToastProps {
  type?: TOAST_TYPE;
  message?: string;
  icon?: ReactNode;
}

type ToastState = ToastProps & { isOpen: boolean };

export type TWithToast<T> = {
  openToast: (toast: ToastProps, callback?: () => void) => void;
} & T;

export const withToast = <T,>(
  Child: (props: TWithToast<T>) => ReactNode,
  enableLoading?: boolean,
) => {
  const RenderToast = (props: T) => {
    const [isLoading, setLoading] = useState(false);
    const [toast, setToast] = useState<ToastState>({
      isOpen: false,
      type: TOAST_TYPE.SUCCESS,
    });

    const closeToast = () => {
      setToast({
        ...toast,
        isOpen: false,
      });
    };

    const openToast = (
      { type = TOAST_TYPE.SUCCESS, message, icon }: ToastProps,
      callback?: () => void,
    ) => {
      const isShowLoading = callback && enableLoading;

      isShowLoading && setLoading(true);

      setToast({ isOpen: true, type, message, icon });

      setTimeout(() => {
        closeToast();
        isShowLoading && setLoading(false);
        callback?.();
      }, 3000);
    };

    const { message, color, icon } = buildToastRenderer(toast);

    return (
      <>
        {toast.isOpen && (
          <Toast
            icon={icon}
            message={message}
            color={color}
            onClose={closeToast}
          />
        )}
        {isLoading ? (
          <LoadingPage fillColor="#fff" isShowTextLoading={false} />
        ) : (
          <Child {...props} openToast={openToast} />
        )}
      </>
    );
  };

  return RenderToast;
};
