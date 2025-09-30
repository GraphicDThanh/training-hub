"use client";

import { memo, useState } from "react";
import isEqual from "react-fast-compare";
import { Button, Dialog, DialogPanel, Text } from "@tremor/react";

// Types
import { NewTransaction, OptionType } from "@/types";

// Services
import { addNewTransaction } from "@/services";

// Utils
import { covertAmountToNumber } from "@/helpers";

// Contexts
import { useToast } from "@/context/toast";

// Hocs
import { TOAST_TYPE } from "@/hocs/withToast";
import { TWithPinCode, withPinCode } from "@/hocs/withPinCode";

// Constants
import { MESSAGES_TRANSACTION } from "@/constants";

// Icons
import { IoAddCircle } from "react-icons/io5";

// Components
import TransactionForm from "../TransactionForm/TransactionForm";

interface CreateTransactionContainerProps {
  options: OptionType[];
  fromUserId: number;
  onRefetchTransactionList: () => void;
}

const CreateTransactionContainer = ({
  options,
  fromUserId,
  onRefetchTransactionList,
  onOpenPinCodeModal,
}: TWithPinCode<CreateTransactionContainerProps>) => {
  const openToast = useToast();
  const [isShowCreateModal, setIsShowCreateModal] = useState<boolean>(false);
  const [isLoadingTransaction, setIsLoadingTransaction] =
    useState<boolean>(false);
  const [errorMessageFromAPI, setErrorMessageFromAPI] = useState<string>("");

  const handleShowErrorMessageFromAPI = (error: string) =>
    setErrorMessageFromAPI(error);

  const handleToggleTransactionModal = () => {
    setIsShowCreateModal(!isShowCreateModal);
  };

  const handleOpenTransactionModal = () => {
    setIsShowCreateModal(true);
  };

  const handleCloseTransactionModal = () => {
    const pincode = document.getElementById("pincode-modal");

    if (!pincode) {
      setIsShowCreateModal(false);

      return;
    }

    setIsShowCreateModal(true);
  };

  const handleSubmit = (payload: NewTransaction) => {
    onOpenPinCodeModal(async () => {
      setIsLoadingTransaction(true);
      const result = await addNewTransaction({
        ...payload,
        amount: covertAmountToNumber(payload.amount),
        fromUserId: fromUserId,
      });

      setIsLoadingTransaction(false);
      if (typeof result === "string") {
        handleShowErrorMessageFromAPI(result);
        openToast({
          type: TOAST_TYPE.ERROR,
          message: MESSAGES_TRANSACTION.ADD_FAILED,
        });
        return;
      }

      handleToggleTransactionModal();
      openToast({
        type: TOAST_TYPE.SUCCESS,
        message: MESSAGES_TRANSACTION.ADD_SUCCESS,
      });
      onRefetchTransactionList();
    });
  };

  return (
    <>
      <Button
        data-testid="openTransactionModal"
        aria-label="Add New Transaction Button"
        className="bg-transparent hover:bg-transparent border-none p-0 dark:bg-transparent dark:hover:bg-transparent btn-create"
        onClick={handleOpenTransactionModal}>
        <IoAddCircle className="text-primary w-5 h-4 dark:text-white" />
      </Button>
      <Dialog open={isShowCreateModal} onClose={handleCloseTransactionModal}>
        <DialogPanel className="py-5 px-4 rounded-md border-none outline-none flex flex-col gap-5 sm:min-w-[80%] md:min-w-[500px] bg-tremor-primary dark:bg-dark-tremor-primary">
          <div>
            <h2 className="capitalize font-bold text-2xl text-center text-tertiary dark:text-dark-romance">
              Create new transaction
            </h2>
            {errorMessageFromAPI && (
              <Text className="text-xs text-red-500 dark:text-red-500 text-center">
                {errorMessageFromAPI}
              </Text>
            )}
          </div>
          <TransactionForm
            isLoadingTransaction={isLoadingTransaction}
            options={options}
            onSubmit={handleSubmit}
            onClose={handleToggleTransactionModal}
            handleShowErrorMessageFromAPI={handleShowErrorMessageFromAPI}
          />
        </DialogPanel>
      </Dialog>
    </>
  );
};

const CreateTransactionContainerWithPinCode = withPinCode(
  CreateTransactionContainer,
);

export default memo(CreateTransactionContainerWithPinCode, isEqual);
