import { render } from "@testing-library/react";

// Constants
import { ROUTES } from "@/constants";

// Components
import Breadcrumb from "./Breadcrumb";

// Mocking usePathname hook
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest
    .fn()
    .mockReturnValueOnce(ROUTES.PROJECTS)
    .mockReturnValueOnce(ROUTES.PRODUCTS)
    .mockReturnValue("/products/87120"),
  useParams: jest.fn().mockReturnValueOnce({ id: "322" }),
}));

describe("Testing breadcrumb component", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("Should match snapshot", () => {
    const { container } = render(
      <Breadcrumb isScrolled={true} pathname={`${ROUTES.PRODUCTS}/322`} />,
    );

    expect(container).toMatchSnapshot();
  });

  it("Should render correctly with display breadcrumb with route projects", async () => {
    const { container } = render(
      <Breadcrumb
        isScrolled={false}
        pathname={`${ROUTES.PROJECTS}/322`}
        isUserAdmin
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
