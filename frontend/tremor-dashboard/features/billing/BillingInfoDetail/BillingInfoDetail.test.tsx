import { render } from "@testing-library/react";

// Components
import BillingInfoDetail from "./BillingInfoDetail";

describe("Testing BillingInfo component", () => {
  const propsMock = [
    {
      id: "1",
      ownerName: "Jessie",
      companyName: "Fly",
      cardLast4Digit: "6868",
      email: "admin@gamil.com",
      vat: "FRB12345776",
    },
    {
      id: "2",
      ownerName: "Kales",
      companyName: "Orange",
      cardLast4Digit: "6868",
      email: "admin@gamil.com",
      vat: "FRB12345776",
    },
  ];
  it("Should match snapshot", () => {
    const { container } = render(
      <BillingInfoDetail billingInfos={propsMock} />,
    );
    expect(container).toMatchSnapshot();
  });
});
