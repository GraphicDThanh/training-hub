import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Constants
import { MESSAGES_ERROR } from "@/constants";

// Components
import ProjectFields from "./ProjectFields";
import { PARTICIPANTS_PROJECTS, TOOL_ICON_OPTION } from "@/constants/projects";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "@/types";

const mockControllerNonError = (name: string, rule: Object) => ({
  field: {
    name: name,
    rules: rule,
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
  // Mock the Controller component
  Controller: (props: any) =>
    props.render(mockControllerNonError(props.name, props.rule)),
}));

describe("Testing ProjectFields component", () => {
  const { control } = useForm<ProjectFormData>();

  const setupRender = () => {
    return render(
      <ProjectFields
        control={control}
        projectTools={TOOL_ICON_OPTION}
        participantsData={PARTICIPANTS_PROJECTS}
      />,
    );
  };

  it.skip("Should match snapshot", () => {
    const { container } = setupRender();
    expect(container).toMatchSnapshot();
  });

  it.skip("Should show error messages for invalid name", async () => {
    const { container, getByTestId, queryByText } = setupRender();
    const inputField = getByTestId("nameProject");

    await waitFor(() => fireEvent.change(inputField));

    await waitFor(() => fireEvent.blur(inputField));

    expect(container).toMatchSnapshot();
    expect(queryByText(MESSAGES_ERROR.FIELD_REQUIRED)).toBeTruthy();
  });

  it.skip("Should show error messages for invalid name", async () => {
    const { container, getByTestId, queryByText } = setupRender();
    const inputField = getByTestId("nameProject");

    await waitFor(() => fireEvent.change(inputField));

    await waitFor(() => fireEvent.blur(inputField));

    expect(container).toMatchSnapshot();
    expect(queryByText(MESSAGES_ERROR.MIN_LENGTH_4)).toBeTruthy();
  });
});
