import { renderHook } from "@testing-library/react";

// Hooks
import UseBreadcrumb from "@/hooks/UseBreadcrumb";

// Mocking usePathname hook
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn().mockReturnValue("products/230019/edit-product"),
  useParams: jest.fn().mockReturnValueOnce({ id: "230019" }),
}));

describe("UseBreadcrumb", () => {
  it("should render snapshot", () => {
    const mockUseBreadcrumb = {
      isScrolled: true,
      pathname: "/products/230019/edit-product",
      isUserAdmin: true,
    };

    renderHook(() => UseBreadcrumb({ ...mockUseBreadcrumb }));
  });

  it("will show title after call getTitle if have path", () => {
    const mockUseBreadcrumb = {
      isScrolled: true,
      pathname: "/products",
      isUserAdmin: true,
    };

    const { result } = renderHook(() =>
      UseBreadcrumb({ ...mockUseBreadcrumb }),
    );

    const getTitleResult = result.current.getTitle(
      "http://localhost:3000/products/87120",
    );
    expect(getTitleResult).toBe("Product Details");
  });

  it("will show pathname after call getTitle if not have path", () => {
    const mockUseBreadcrumb = {
      isScrolled: true,
      pathname: "/products",
      isUserAdmin: true,
    };

    const { result } = renderHook(() =>
      UseBreadcrumb({ ...mockUseBreadcrumb }),
    );

    const getTitleResult = result.current.getTitle();
    expect(getTitleResult).toBe("products");
  });

  it("should show isStickyHeader is false if isScrolled is false and pathname is not project page", () => {
    const mockUseBreadcrumb = {
      isScrolled: false,
      pathname: "/products",
      isUserAdmin: true,
    };

    const { result } = renderHook(() =>
      UseBreadcrumb({ ...mockUseBreadcrumb }),
    );

    const getIsStickyHeader = result.current.isStickyHeader;
    expect(getIsStickyHeader).toBe(false);
  });

  it("should show isStickyHeader is true if isScrolled is false and pathname is project page", () => {
    const mockUseBreadcrumb = {
      isScrolled: false,
      pathname: "/projects",
      isUserAdmin: true,
    };

    const { result } = renderHook(() =>
      UseBreadcrumb({ ...mockUseBreadcrumb }),
    );

    const getIsStickyHeader = result.current.isStickyHeader;
    expect(getIsStickyHeader).toBe(true);
  });

  it("should show isDisplayTitle is true if pathname is product detail page", () => {
    const mockUseBreadcrumb = {
      isScrolled: true,
      pathname: "/products/322",
      isUserAdmin: true,
    };

    const { result } = renderHook(() =>
      UseBreadcrumb({ ...mockUseBreadcrumb }),
    );

    const getIsDisplayTitleResult = result.current.isDisplayTitle;
    expect(getIsDisplayTitleResult).toBe(true);
  });
});
