import { fireEvent, render } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { ReactNode } from "react";

// Components
import Media from "./Media";

//Types
import { IMedia } from "@/types";

// Constants
import { DRAG_ZONE } from "@/constants";

interface ControllerProps {
  name?: string;
  render?: (arg0: {
    field?: {
      value?: string[] | string;
      name?: string;
      onChange?: jest.Mock<string, string[], string>;
    };
    formState?: {
      field?: { name: string; rules: Object };
      errors?: {};
    };
    fieldState?: { error: { message?: string } };
  }) => ReactNode;
}

const mockControllerNonError = (name: string) => ({
  field: {
    name: name,
    onChange: jest.fn(),
    value: [],
  },
  formState: { errors: {} },
});

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  // Mock the useFormContext hook
  useForm: jest.fn(() => {
    return {
      formState: {
        errors: {},
      },
    };
  }),
  // Mock the Controller
  Controller: (props: ControllerProps) => {
    return props?.render?.(mockControllerNonError(props.name as string));
  },
}));

const onUploadMock = jest.fn();

describe("Media component", () => {
  const { control } = useForm<IMedia>();

  // Create a PNG file object
  const file = new File(["test image"], "test.png", { type: "image/png" });

  const setupRender = () =>
    render(<Media control={control} onUpload={onUploadMock} />);

  it("Should match snapshot", () => {
    const { container } = setupRender();
    expect(container).toMatchSnapshot();
  });

  it("should call onUpload if user inputs an image file", () => {
    const { getByTestId } = setupRender();

    const inputElement = getByTestId("dropzone-file");

    // Simulate a change event with image file
    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(onUploadMock).toHaveBeenCalledWith(file);
  });

  it("should call onUpload if drop an image that has name match TYPE_FILE_IMAGE_REGEX", () => {
    const { getByTestId } = setupRender();

    const labelElement = getByTestId("drag-file");

    // Simulate a onDrop event with image file
    fireEvent.drop(labelElement, { dataTransfer: { files: [file] } });

    // expect onUpload called
    const inputElement = getByTestId("dropzone-file");

    // Simulate a change event with image file
    fireEvent.change(inputElement, { target: { files: [file] } });

    expect(onUploadMock).toHaveBeenCalledWith(file);
  });

  it("should not call onUpload and update input styles if drop an image that has name not match regex", () => {
    const { getByTestId, getByText } = setupRender();

    const labelElement = getByTestId("drag-file");

    // Expect input, label styles and text before onDrop
    expect(getByText(DRAG_ZONE.DEFAULT.TEXT)).toBeTruthy();
    expect(
      labelElement.className.includes(DRAG_ZONE.DEFAULT.STYLE_INPUT),
    ).toBeTruthy();
    expect(
      labelElement
        .querySelectorAll("p")[0]
        .className.includes(DRAG_ZONE.DEFAULT.STYLE_TEXT),
    ).toBeTruthy();

    // Simulate a onDrop event with empty file
    fireEvent.drop(labelElement, { dataTransfer: { files: [] } });

    // Expect input, label styles change and text after onDrop
    expect(getByText(DRAG_ZONE.ON_WRONG_FORMAT.TEXT)).toBeTruthy();
    expect(
      labelElement.className.includes(DRAG_ZONE.ON_WRONG_FORMAT.STYLE_INPUT),
    ).toBeTruthy();
    expect(
      labelElement
        .querySelectorAll("p")[0]
        .className.includes(DRAG_ZONE.ON_WRONG_FORMAT.STYLE_TEXT),
    ).toBeTruthy();
  });

  it("should update input component correctly if drag image into input", () => {
    const { getByTestId, getByText } = setupRender();

    const labelElement = getByTestId("drag-file");

    // Expect input, label styles and text before dragEnter
    expect(getByText(DRAG_ZONE.DEFAULT.TEXT)).toBeTruthy();
    expect(
      labelElement.className.includes(DRAG_ZONE.DEFAULT.STYLE_INPUT),
    ).toBeTruthy();
    expect(
      labelElement
        .querySelectorAll("p")[0]
        .className.includes(DRAG_ZONE.DEFAULT.STYLE_TEXT),
    ).toBeTruthy();

    // Simulate a dragImage event with the file
    fireEvent.dragEnter(labelElement, { dataTransfer: { files: [file] } });

    // Expect input, label styles change and text after dragEnter
    expect(getByText(DRAG_ZONE.ON_DRAG.TEXT)).toBeTruthy();
    expect(
      labelElement.className.includes(DRAG_ZONE.ON_DRAG.STYLE_INPUT),
    ).toBeTruthy();
    expect(
      labelElement
        .querySelectorAll("p")[0]
        .className.includes(DRAG_ZONE.ON_DRAG.STYLE_TEXT),
    ).toBeTruthy();
  });

  it("should show input, label styles and text default if drag over an image", () => {
    const { getByTestId, getByText } = setupRender();

    const labelElement = getByTestId("drag-file");

    // Simulate a dragOver event with the file
    fireEvent.dragOver(labelElement, { dataTransfer: { files: [file] } });
    // Expect input, label styles change and text after dragOver
    expect(getByText(DRAG_ZONE.DEFAULT.TEXT)).toBeTruthy();
    expect(
      labelElement.className.includes(DRAG_ZONE.DEFAULT.STYLE_INPUT),
    ).toBeTruthy();
    expect(
      labelElement
        .querySelectorAll("p")[0]
        .className.includes(DRAG_ZONE.DEFAULT.STYLE_TEXT),
    ).toBeTruthy();
  });
});
