import { render } from "@testing-library/react";

// Helpers
import { formatDateTime } from "@/helpers/formatDate";

// Components
import CustomDateFormat from "./CustomDateFormat";

const CustomDateFormatComponent = () =>
  render(<CustomDateFormat date="01 Nov, 11:20 AM" />);

const CustomDateFormatEmpty = () => render(<CustomDateFormat date="" />);

describe("CustomDateFormat component", () => {
  it("should render snapshot correctly", () => {
    const { container } = CustomDateFormatComponent();

    expect(container).toMatchSnapshot();
  });

  it("should render date with formatDateTime correct", () => {
    const { getByText } = CustomDateFormatComponent();
    const dateText = getByText(formatDateTime("01 Nov, 11:20 AM"));

    expect(dateText).toBeTruthy();
  });

  it("should show error if empty date", () => {
    const { getByText } = CustomDateFormatEmpty();
    const dateText = getByText("Invalid Date");

    expect(dateText).toBeTruthy();
  });
});
