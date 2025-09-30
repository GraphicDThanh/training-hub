// Libs
import { useForm } from "react-hook-form";
import { render } from "@testing-library/react";

// Components
import UserInfo from "./UserInfo";

// Types
import { UserBasicInfo } from "@/types";

const mockControllerNonError = (name: string, rule: Object) => ({
  field: {
    name: name,
    rules: rule,
    onChange: jest.fn(),
    value: [],
  },
  formState: { errors: {} },
  fieldState: { error: {} },
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

describe("UserInfo Component", () => {
  const { control, watch } = useForm<UserBasicInfo>();

  const renderUserInfoComponent = (isEdit = false) =>
    render(
      <UserInfo
        control={control}
        watch={watch}
        isEdit={isEdit}
      />,
    );

  it("should match snapshot for props isEdit is true", () => {
    const { container } = renderUserInfoComponent(true);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot for props isEdit is false", () => {
    const { container } = renderUserInfoComponent();
    expect(container).toMatchSnapshot();
  });
});
