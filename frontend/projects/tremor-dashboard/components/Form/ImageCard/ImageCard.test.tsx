import { fireEvent, render } from "@testing-library/react";

// Components
import ImageCard from "./ImageCard";

const onRemoveImageMock = jest.fn();
const onUploadMock = jest.fn();

describe("ImageCard component", () => {
  const props = {
    name: "Minimal Bar Stool 3",
    desc: "Description",
    image: "https://i.ibb.co/PGcBzMv/a-high-detail-shot-of-a-cat-we.png",
    onRemoveImage: onRemoveImageMock,
    onUpload: onUploadMock,
  };

  const renderComponent = () => render(<ImageCard {...props} />);

  it("should render snapshot correctly", () => {
    const component = renderComponent();

    expect(component).toMatchSnapshot();
  });

  it("renders loading indicator when isUpload is true", () => {
    const { queryAllByText } = render(<ImageCard {...props} isUpload={true} />);

    const loadingTexts = queryAllByText("Loading...");

    expect(loadingTexts.length).toBeGreaterThan(0);
  });

  it("renders custom image when disabled is true", () => {
    const { queryByAltText } = render(<ImageCard {...props} disabled={true} />);

    expect(queryByAltText("Minimal Bar Stool 3")).not.toBeNull();
  });

  it("calls onRemoveImage function when remove button is clicked", () => {
    const { getByText } = renderComponent();

    const removeButton = getByText("Remove Image");
    fireEvent.click(removeButton);

    expect(onRemoveImageMock).toHaveBeenCalledTimes(1);
  });

  it("calls onUpload with the correct file", () => {
    // Create a PNG file object
    const file = new File(["test image"], "test.png", { type: "image/png" });

    const { getByLabelText } = renderComponent();

    const inputElement = getByLabelText("Change Image");

    // Simulate a change event with the file
    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(onUploadMock).toHaveBeenCalledWith(file);
  });
});
