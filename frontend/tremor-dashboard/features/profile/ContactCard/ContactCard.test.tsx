import { render } from "@testing-library/react";

// Components
import ContactCard from "./ContactCard";

describe("ContactCard component", () => {
  const props = {
    fullName: "",
    phone: "",
    email: "",
    location: "",
  };

  it("Should render ContactCard snapshot correctly", () => {
    const { container } = render(<ContactCard {...props} />);
    expect(container).toMatchSnapshot();
  });
});
