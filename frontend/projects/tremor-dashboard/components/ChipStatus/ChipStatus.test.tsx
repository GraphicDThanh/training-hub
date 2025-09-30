import { render } from "@testing-library/react";

// Constants
import { TRANSACTION_CLASS } from "@/constants";

// Components
import ChipStatus from "./ChipStatus";

describe("ChipStatus", () => {
  const { PENDING, INCREASE, DECREASE } = TRANSACTION_CLASS ?? {};
  const MOCK_VALUES = {
    PENDING: "Pending",
    INCREASE: "+",
    DECREASE: "-",
  };

  it("Match snapshot", () => {
    const { container } = render(
      <ChipStatus
        value={MOCK_VALUES.PENDING}
        extendedClass={PENDING.buttonClasses}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("match snapshot with value is increase", () => {
    const { container } = render(
      <ChipStatus
        value={MOCK_VALUES.INCREASE}
        extendedClass={INCREASE.buttonClasses}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("match snapshot with value is decrease", () => {
    const { container } = render(
      <ChipStatus
        value={MOCK_VALUES.DECREASE}
        extendedClass={DECREASE.buttonClasses}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
