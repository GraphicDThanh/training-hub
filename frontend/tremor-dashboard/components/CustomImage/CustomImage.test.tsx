import React from "react";
import { render, fireEvent } from "@testing-library/react";

// Components
import CustomImage from "./CustomImage";

// Constants
import { NOT_FOUND_IMAGE } from "@/constants";
import { PROFILE_ITEM } from "@/mocks";

// Mock next/image component
jest.mock("next/image", () => {
  return jest.fn(props => {
    return <img src={props.src} alt={props.alt} onError={props.onError} />;
  });
});

// Mock useState
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("CustomImage Component", () => {
  const props = {
    width: 100,
    height: 100,
    className: "mock-class",
    alt: "Mock Alt",
    src: PROFILE_ITEM.avatar,
  };

  const customImageComponent = () => {
    return render(<CustomImage {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Match snapshot", () => {
    const useStateSpy = jest.spyOn(React, "useState");

    useStateSpy.mockReturnValue([true, jest.fn()]);

    const { container } = render(
      <CustomImage {...props} src={NOT_FOUND_IMAGE} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("Sets fallback source on error", () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");

    useStateSpy.mockReturnValue([false, setState]);

    const { getByAltText } = customImageComponent();
    const image = getByAltText(props.alt);

    fireEvent.error(image);

    expect(setState).toHaveBeenCalledWith(true);
  });
});
