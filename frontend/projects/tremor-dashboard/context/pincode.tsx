"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { updatePinCode } from "@/services";

interface IPinCodeContext {
  pinCode?: string;
  setPinCode: (value: string) => void;
}

const initialPinCodeContext: IPinCodeContext = {
  setPinCode: () => {},
};

const PinCodeContext = createContext(initialPinCodeContext);

interface IPinCodeProvider {
  children: ReactNode;
  pinCode?: string;
}

const PinCodeProvider = ({
  children,
  pinCode: initialPinCode,
}: IPinCodeProvider) => {
  const [pinCode, setPinCode] = useState<string | undefined>(initialPinCode);

  const pinCodeContextValue: IPinCodeContext = useMemo(
    () => ({ pinCode, setPinCode }),
    [pinCode],
  );

  return (
    <PinCodeContext.Provider value={pinCodeContextValue}>
      {children}
    </PinCodeContext.Provider>
  );
};

const usePinCode = () => {
  const context = useContext(PinCodeContext);

  if (!context) {
    throw new Error("usePinCode hooks should using inside PinCodeProvider!");
  }

  const { pinCode, setPinCode } = context;

  const handleSetPinCode = useCallback(
    async (pinCode: string) => {
      const { errorMessage } = await updatePinCode(pinCode);

      if (errorMessage) {
        setPinCode(pinCode);
      }

      return !!errorMessage;
    },
    [setPinCode],
  );

  return {
    pinCode,
    setPinCode: handleSetPinCode,
  };
};

export { PinCodeProvider, usePinCode };
