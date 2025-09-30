import "@testing-library/jest-dom";
import { fireEvent, render, renderHook, act } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";

// Types
import { NewTransaction } from "@/types";

// Components
import TransactionForm from "../TransactionForm";

describe("TransactionForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();
  const { result } = renderHook(() => useForm<NewTransaction>({}));
  const props = {
    options: [],
    errorMessageFromAPI: "",
    onSubmit: mockOnSubmit,
    onClose: mockOnClose,
  };

  const TransactionFormContainer = () => (
    <FormProvider {...result.current}>
      <TransactionForm {...props} />
    </FormProvider>
  );

  it("match snapshot", () => {
    const { container } = render(<TransactionFormContainer />);

    expect(container).toMatchSnapshot();
  });

  it("calls cancel create new transaction", async () => {
    const { getByText } = render(<TransactionFormContainer />);

    const cancelButton = getByText("Cancel");

    await act(() => {
      fireEvent.click(cancelButton);
    });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
