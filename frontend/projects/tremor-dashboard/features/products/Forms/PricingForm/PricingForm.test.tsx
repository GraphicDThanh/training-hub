// Libs
import { render, fireEvent, waitFor, act } from "@testing-library/react";

// Components
import PricingForm from "./PricingForm";

// Mocks
import { MOCK_PRICING_INFO } from "@/mocks";

describe("PricingForm", () => {
  it("should match snapshot", async () => {
    const { container } = render(
      <PricingForm
        {...MOCK_PRICING_INFO}
        onBack={() => {}}
        onSubmit={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });
  it("should show error message if have errorMessage", async () => {
    const { getByText } = render(
      <PricingForm
        {...MOCK_PRICING_INFO}
        errorMessage="Test show error"
        onBack={() => {}}
        onSubmit={() => {}}
      />,
    );

    expect(
      getByText("Please review these error then try again: Test show error"),
    ).toBeTruthy();
  });

  it("can not click on Back and Send button if isLoading is true", async () => {
    const onBack = jest.fn();
    const onSend = jest.fn();
    const { getByTestId } = render(
      <PricingForm
        {...MOCK_PRICING_INFO}
        isLoading={true}
        onBack={onBack}
        onSubmit={onSend}
      />,
    );
    const btnSend = getByTestId("btn-send");
    const btnBack = getByTestId("btn-back");
    fireEvent.click(btnSend);
    expect(onSend).not.toHaveBeenCalled();

    fireEvent.click(btnBack);
    expect(onBack).not.toHaveBeenCalled();
  });

  it("can click on Back button if isLoading is false", async () => {
    const onBack = jest.fn();
    const { getByTestId } = render(
      <PricingForm
        {...MOCK_PRICING_INFO}
        isLoading={false}
        onBack={onBack}
        onSubmit={() => {}}
      />,
    );
    const btnBack = getByTestId("btn-back");
    await act(async () => {
      await fireEvent.click(btnBack);
    });
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should call onSend prop", async () => {
    const onSend = jest.fn();
    const { getByTestId } = render(
      <PricingForm
        {...MOCK_PRICING_INFO}
        isLoading={false}
        onBack={() => {}}
        onSubmit={onSend}
      />,
    );
    const btnSend = getByTestId("btn-send");
    await act(async () => {
      await fireEvent.click(btnSend);
    });
    await waitFor(() => expect(onSend).toHaveBeenCalledTimes(1));
  });
});
