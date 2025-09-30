import { render, fireEvent } from "@testing-library/react";

// Components
import { Text } from "@tremor/react";
import Popover from "./Popover";

describe("Testing Popover component", () => {
  const propsDefault = {
    content: "Content popover",
  };

  it("Should match snapshot", () => {
    const component = render(
      <Popover {...propsDefault}>
        <Text>Hover to show content popover</Text>
      </Popover>,
    );
    expect(component).toMatchSnapshot();
  });

  it("Displays content when hovered over", () => {
    const content = "Popover content";
    const { getByText } = render(
      <Popover content={content}>
        <button>Hover me</button>
      </Popover>,
    );

    const button = getByText("Hover me");
    fireEvent.mouseOver(button);

    expect(getByText(content)).toBeVisible;
  });

  it("Hides content when mouse leaves", () => {
    const content = "Popover content";
    const { getByText, queryByText } = render(
      <Popover content={content}>
        <button>Hover me</button>
      </Popover>,
    );

    const button = getByText("Hover me");

    fireEvent.mouseOver(button);
    expect(getByText(content)).toBeVisible;

    fireEvent.mouseLeave(button);
    expect(queryByText(content)).not.toBeInTheDocument;
  });
});
