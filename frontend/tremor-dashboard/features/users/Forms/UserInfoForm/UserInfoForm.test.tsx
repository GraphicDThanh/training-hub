// Libs
import { render } from "@testing-library/react";

// Components
import UserInfoForm from "./UserInfoForm";

// Mocks
import { MOCK_USERS, MOCK_USER_BIRTHDAY } from "@/mocks";

describe("UserInfoForm", () => {
  const mockOnSubmit = jest.fn();
  const props = {
    ...MOCK_USERS[0],
    birthday: MOCK_USER_BIRTHDAY,
    onSubmit: mockOnSubmit,
  };
  it("should match snapshot", () => {
    const { container } = render(<UserInfoForm {...props} />);

    expect(container).toMatchSnapshot();
  });
});
