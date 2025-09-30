import { render, fireEvent, waitFor, act } from "@testing-library/react";

// Constants
import { MESSAGES_ERROR, MESSAGE_SIGN_UP, ROUTES } from "@/constants";

// Components
import SignUpForm from ".";

const mockReplace = jest.fn();

// Mock next
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn().mockReturnValueOnce(ROUTES.SIGN_IN),
  useRouter: () => ({ replace: mockReplace }),
}));

jest.mock("@/services/firebase", () => ({
  updateDataFirestore: jest.fn(),
}));

describe("SignUpForm Component", () => {
  const renderComponent = () => render(<SignUpForm />);

  it("should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("should show error messages if blur input name with empty name", async () => {
    const { getByTestId, queryByText } = renderComponent();
    const inputNameSignup = getByTestId("signup-name");
    act(() => {
      fireEvent.change(inputNameSignup, { target: { value: "" } });
    });
    expect(inputNameSignup.value).toEqual("");
    act(() => {
      fireEvent.blur(inputNameSignup);
    });
    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.NAME_REQUIRED)).toBeTruthy(),
    );
  });

  it("should show error messages if blur input email with empty email", async () => {
    const { getByTestId, queryByText } = renderComponent();
    const inputEmailSignup = getByTestId("signup-email");
    act(() => {
      fireEvent.change(inputEmailSignup, { target: { value: "" } });
    });
    expect(inputEmailSignup.value).toEqual("");
    act(() => {
      fireEvent.blur(inputEmailSignup);
    });
    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.EMAIL_REQUIRED)).toBeTruthy(),
    );
  });

  it("should show error messages if blur input password if empty password", async () => {
    const { getByTestId, queryByText } = renderComponent();
    const inputPassSignup = getByTestId("signup-password");
    act(() => {
      fireEvent.change(inputPassSignup, { target: { value: "" } });
    });
    expect(inputPassSignup.value).toEqual("");
    act(() => {
      fireEvent.blur(inputPassSignup);
    });
    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.PASSWORD_REQUIRED)).toBeTruthy(),
    );
  });

  it("should show error messages if blur input email with invalid email", async () => {
    const { getByTestId, queryByText } = renderComponent();
    const inputEmailSignup = getByTestId("signup-email");
    act(() => {
      fireEvent.change(inputEmailSignup, { target: { value: "admin@asnet" } });
    });
    expect(inputEmailSignup.value).toEqual("admin@asnet");
    act(() => {
      fireEvent.blur(inputEmailSignup);
    });
    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.EMAIL_INVALID)).toBeTruthy(),
    );
  });

  it("should show error messages if blur input password with invalid password", async () => {
    const { getByTestId, queryByText } = renderComponent();
    const inputPassSignup = getByTestId("signup-password");
    act(() => {
      fireEvent.change(inputPassSignup, { target: { value: "admin123" } });
    });
    expect(inputPassSignup.value).toEqual("admin123");
    act(() => {
      fireEvent.blur(inputPassSignup);
    });
    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.PASSWORD_INVALID)).toBeTruthy(),
    );
  });

  it("show toast error if submit signup with user account already exists", async () => {
    const responseData = {
      message: "User already exists.",
      user: null,
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      status: 400,
      json: () => responseData,
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const { container, getByTestId } = renderComponent();
    fireEvent.click(
      container.firstElementChild?.querySelector(
        "#termsAndConditions",
      ) as Element,
    );
    const checkBoxTerms = getByTestId("signup-terms");
    expect(checkBoxTerms.checked).toBeTruthy();

    const inputName = getByTestId("signup-name");
    const inputEmail = getByTestId("signup-email");
    const inputPassword = getByTestId("signup-password");

    fireEvent.change(inputName, { target: { value: "VanNguyenTest" } });
    expect(inputName.value).toEqual("VanNguyenTest");

    fireEvent.change(inputEmail, { target: { value: "admin@tremor.com" } });
    expect(inputEmail.value).toEqual("admin@tremor.com");

    fireEvent.change(inputPassword, { target: { value: "abcABC@123" } });
    expect(inputPassword.value).toEqual("abcABC@123");

    const btnSubmit = getByTestId("signup-submit");

    expect(btnSubmit.disabled).not.toBeTruthy();

    await act(() => {
      fireEvent.click(btnSubmit);
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        "User already exists.",
      ),
    );
  });

  it("show toast message success if submit signup with input user an account", async () => {
    const responseData = {
      message: MESSAGE_SIGN_UP.SUCCESS,
      user: {
        id: 100,
        agreeTerms: true,
        email: "admintest01@tremor.com",
        name: "AdminTest01",
        password:
          "$2b$10$/wwF1iFxZXsPaRPapvcMR.HhApYEliNu8KyAaD1E4STHy8/hYZ/Mm",
      },
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: () => responseData,
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const { container, getByTestId } = renderComponent();
    fireEvent.click(
      container.firstElementChild?.querySelector(
        "#termsAndConditions",
      ) as Element,
    );
    const checkBoxTerms = getByTestId("signup-terms");
    expect(checkBoxTerms.checked).toBeTruthy();

    const inputName = getByTestId("signup-name");
    const inputEmail = getByTestId("signup-email");
    const inputPassword = getByTestId("signup-password");

    fireEvent.change(inputName, { target: { value: "AdminTest01" } });
    expect(inputName.value).toEqual("AdminTest01");

    fireEvent.change(inputEmail, {
      target: { value: "admintest01@tremor.com" },
    });
    expect(inputEmail.value).toEqual("admintest01@tremor.com");

    fireEvent.change(inputPassword, { target: { value: "abcABC@123" } });
    expect(inputPassword.value).toEqual("abcABC@123");

    const btnSubmit = getByTestId("signup-submit");

    expect(btnSubmit.disabled).not.toBeTruthy();

    await act(() => {
      fireEvent.click(btnSubmit);
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        MESSAGE_SIGN_UP.SUCCESS,
      ),
    );
  });

  it("show toast message success and navigation to signin if submit signup successed", async () => {
    jest.useFakeTimers();
    const responseData = {
      message: MESSAGE_SIGN_UP.SUCCESS,
      user: {
        id: 100,
        agreeTerms: true,
        email: "admintest01@tremor.com",
        name: "AdminTest01",
        password:
          "$2b$10$/wwF1iFxZXsPaRPapvcMR.HhApYEliNu8KyAaD1E4STHy8/hYZ/Mm",
      },
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: () => responseData,
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const { container, getByTestId } = renderComponent();
    fireEvent.click(
      container.firstElementChild?.querySelector(
        "#termsAndConditions",
      ) as Element,
    );
    const checkBoxTerms = getByTestId("signup-terms");
    expect(checkBoxTerms.checked).toBeTruthy();

    const inputName = getByTestId("signup-name");
    const inputEmail = getByTestId("signup-email");
    const inputPassword = getByTestId("signup-password");

    fireEvent.change(inputName, { target: { value: "AdminTest01" } });
    expect(inputName.value).toEqual("AdminTest01");

    fireEvent.change(inputEmail, {
      target: { value: "admintest01@tremor.com" },
    });
    expect(inputEmail.value).toEqual("admintest01@tremor.com");

    fireEvent.change(inputPassword, { target: { value: "abcABC@123" } });
    expect(inputPassword.value).toEqual("abcABC@123");

    const btnSubmit = getByTestId("signup-submit");

    expect(btnSubmit.disabled).not.toBeTruthy();

    await act(() => {
      fireEvent.click(btnSubmit);
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        MESSAGE_SIGN_UP.SUCCESS,
      ),
    );

    await act(() => {
      jest.runOnlyPendingTimers();
      jest.advanceTimersByTime(3000);
    });

    expect(mockReplace).toHaveBeenCalled();
  });
});
