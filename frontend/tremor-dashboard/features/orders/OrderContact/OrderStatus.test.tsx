import { render } from "@testing-library/react";

// Components
import { OrderStatus } from "./OrderStatus";

const renderComponent = (status: number) => {
  return render(<OrderStatus period={18} status={status} />);
};

describe("OrderStatus Component", () => {
  it("render OrderStatus component with snapshot correctly", () => {
    const { container } = renderComponent(0);

    expect(container).toMatchSnapshot();
  });

  it("render status canceled with status is 1", () => {
    const { getAllByText } = renderComponent(1);
    expect(getAllByText("canceled")).toBeTruthy();
  });

  it("render status refunded with status is 2", () => {
    const { getAllByText } = renderComponent(2);
    expect(getAllByText("refunded")).toBeTruthy();
  });

  it("render status refunded with status is 3", () => {
    //status === !0 | !1 | !2, the order status is pending
    const { getAllByText } = renderComponent(3);
    expect(getAllByText("pending")).toBeTruthy();
  });
});
