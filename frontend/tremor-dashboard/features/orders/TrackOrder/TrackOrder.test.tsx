import { render } from "@testing-library/react";

// Components
import TrackOrder from "./TrackOrder";

// Mocks
import { MOCK_TRACK_ORDER } from "@/mocks";

const props = {
  id: MOCK_TRACK_ORDER.id,
  generateOrderId: MOCK_TRACK_ORDER.generateOrderId,
  deliveredAt: MOCK_TRACK_ORDER.deliveredAt,
  transmittedToCourierAt: MOCK_TRACK_ORDER.transmittedToCourierAt,
  generateOrderAt: MOCK_TRACK_ORDER.generateOrderAt,
};

const TrackOrderComponent = (status: number) => {
  return render(<TrackOrder {...props} status={status} />);
};

describe("TrackOrder Component", () => {
  it("render TrackOrder component with snapshot correctly", () => {
    const { container } = TrackOrderComponent(0);

    expect(container).toMatchSnapshot();
  });

  it("render status Order canceled with status is 1", () => {
    const { getAllByText } = TrackOrderComponent(1);
    expect(getAllByText("Order canceled")).toBeTruthy();
  });

  it("render status Order refunded with status is 2", () => {
    const { getAllByText } = TrackOrderComponent(2);
    expect(getAllByText("Order refunded")).toBeTruthy();
  });
});
