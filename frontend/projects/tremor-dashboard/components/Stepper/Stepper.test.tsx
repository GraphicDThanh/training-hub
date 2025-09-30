// Libs
import { render } from "@testing-library/react";

// Components
import Stepper from "./Stepper";

// Types
import { Step } from "@/types";

describe("Stepper component testing", () => {
  const mockSteps: Step[] = [
    { index: 1, content: "Product Info" },
    { index: 2, content: "Media" },
    { index: 3, content: "Social" },
    { index: 4, content: "Pricing" },
  ];
  it("should match snapshot first step", () => {
    const { container } = render(
      <Stepper steps={mockSteps} currentStep={1} total={mockSteps.length} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should match snapshot last step", () => {
    const { container } = render(
      <Stepper steps={mockSteps} currentStep={4} total={mockSteps.length} />,
    );

    expect(container).toMatchSnapshot();
  });
});
