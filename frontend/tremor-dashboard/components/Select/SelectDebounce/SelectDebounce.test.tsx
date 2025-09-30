import { render } from "@testing-library/react";

//
import SelectDebounce from "./SelectDebounce";
import { MOCK_EMAIL_OPTIONS } from "@/mocks";

describe("SelectDebounce", () => {
  const renderComponent = () =>
    render(
      <SelectDebounce
        id="toUserId"
        label="User"
        options={MOCK_EMAIL_OPTIONS}
      />,
    );

  // TODO: I will update the onChange case later
  it("Match snapshot", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
