import { render, fireEvent } from "@testing-library/react";

// Components
import ImagePreview from "./ImagePreview";

// Mocks
import { MOCK_URL_AVATAR } from "@/mocks";

describe("Testing ImagePreview component", () => {
  const mockRemoveImage = jest.fn();
  const propsDefault = {
    filename: "",
    url: MOCK_URL_AVATAR,
    onRemove: mockRemoveImage,
  };

  it("should match snapshot", () => {
    const { container } = render(<ImagePreview {...propsDefault} />);

    expect(container).toMatchSnapshot();
  });

  it("should call onRemove prop when click on Remove Image", () => {
    const { getByText } = render(<ImagePreview {...propsDefault} />);

    fireEvent.click(getByText("Remove Image"));

    expect(mockRemoveImage).toHaveBeenCalledTimes(1);
  });

  it("should not render text Remove Image action if image empty", () => {
    const { queryByText } = render(<ImagePreview {...propsDefault} url="" />);

    expect(queryByText("Remove Image")).toBeFalsy();
  });
});
