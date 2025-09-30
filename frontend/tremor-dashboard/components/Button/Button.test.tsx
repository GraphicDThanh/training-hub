import { render, fireEvent } from "@testing-library/react";

// Components
import Button from "./Button";

// Constants
import { VARIANT_BUTTON } from "@/constants";

describe("Button Component", () => {
  it("Should match snapshot for primary button", () => {
    const { container } = render(
      <Button variant={VARIANT_BUTTON.PRIMARY}>Hello</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should match snapshot for primary center button", () => {
    const { container } = render(
      <Button variant={VARIANT_BUTTON.PRIMARY_CENTER}>Hello</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should match snapshot for secondary button", () => {
    const { container } = render(
      <Button variant={VARIANT_BUTTON.SECONDARY}>Hello</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should match snapshot for secondary shadow button", () => {
    const { container } = render(
      <Button variant={VARIANT_BUTTON.SECONDARY_SHADOW}>Hello</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should match snapshot for light button", () => {
    const { container } = render(
      <Button variant={VARIANT_BUTTON.LIGHT}>Hello</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should match snapshot for light card button", () => {
    const { container } = render(
      <Button variant={VARIANT_BUTTON.LIGHT_CARD}>Hello</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should match snapshot for light status button", () => {
    const { container } = render(
      <Button variant={VARIANT_BUTTON.LIGHT_STATUS}>Hello</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should match snapshot for light center button", () => {
    const { container } = render(
      <Button variant={VARIANT_BUTTON.LIGHT_CENTER}>Hello</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should match snapshot for surface button", () => {
    const { container } = render(
      <Button variant={VARIANT_BUTTON.SURFACE}>Hello</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should match snapshot for dark button", () => {
    const { container } = render(
      <Button variant={VARIANT_BUTTON.DARK}>Hello</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("Should match snapshot for empty variant button", () => {
    const { container } = render(<Button variant={""}>Hello</Button>);
    expect(container).toMatchSnapshot();
  });

  it("Calls onClick callback when clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click Me</Button>);
    fireEvent.click(getByText("Click Me"));
    expect(onClick).toHaveBeenCalled();
  });

  it("Will not call onClick when disabled", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button onClick={onClick} disabled={true}>
        Click Me
      </Button>,
    );
    fireEvent.click(getByText("Click Me"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
