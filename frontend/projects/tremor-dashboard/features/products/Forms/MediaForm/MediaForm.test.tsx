// Libs
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
// Components
import MediaForm from "./MediaForm";

describe("MediaForm component", () => {
  // Create a PNG file object
  const file = new File(
    ["test image"],
    "https://i.ibb.co/sHdk2Nq/0daa97f4b0dbe9a9686984982977da86-1-1.png",
    { type: "image/png" },
  );

  it("should match snapshot", async () => {
    const { container } = render(
      <MediaForm onBack={() => {}} onSubmit={() => {}} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should call onBack prop if click Back button", async () => {
    const onBack = jest.fn();
    const { getByTestId } = render(
      <MediaForm onBack={onBack} onSubmit={() => {}} />,
    );
    const btnBack = getByTestId("back-btn");

    fireEvent.click(btnBack);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should call onNext prop if click Next button", async () => {
    const onNext = jest.fn();
    const { getByTestId } = render(
      <MediaForm onBack={() => {}} onSubmit={onNext} />,
    );
    const btnNext = getByTestId("next-btn");
    fireEvent.click(btnNext);

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledTimes(1);
    });
  });

  it("should show/hide Loading if user upload an image", async () => {
    const { queryAllByText, getByTestId } = render(
      <MediaForm onBack={() => {}} onSubmit={() => {}} />,
    );

    const inputElement = getByTestId("dropzone-file");

    // Simulate a change event with image file
    fireEvent.change(inputElement, { target: { files: [file] } });

    await waitFor(() => {
      const loadingTexts = queryAllByText("Loading...");
      expect(loadingTexts.length).toBeGreaterThan(0);
    });

    await waitFor(() => {
      const loadingTexts = queryAllByText("Loading...");
      expect(loadingTexts.length).toEqual(0);
    });
  });
});
