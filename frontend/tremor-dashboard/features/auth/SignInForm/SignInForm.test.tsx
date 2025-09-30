import { render, waitFor, fireEvent, act } from "@testing-library/react";

// Components
import SignInForm from ".";

// Constants
import { MESSAGES_ERROR, MESSAGE_SIGN_IN } from "@/constants";

jest.mock("@/services/authenticationLogin", () => ({
  authenticationLogin: jest.fn(),
}));

describe("SignInForm Component", () => {
  const renderComponent = () => render(<SignInForm />);

  it("should match snapshot", () => {
    const component = renderComponent();
    expect(component).toMatchSnapshot();
  });

  it("should show error messages for empty email", async () => {
    const { getByTestId, queryByText } = renderComponent();
    const inputEmail = getByTestId("signin-email");
    act(() => {
      fireEvent.change(inputEmail, { target: { value: "" } });
    });
    expect(inputEmail.value).toEqual("");
    act(() => {
      fireEvent.blur(inputEmail);
    });
    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.EMAIL_REQUIRED)).toBeTruthy(),
    );
  });

  it("should show error messages for empty password", async () => {
    const { getByTestId, queryByText } = renderComponent();
    const inputPassword = getByTestId("signin-password");
    act(() => {
      fireEvent.change(inputPassword, { target: { value: "" } });
    });
    expect(inputPassword.value).toEqual("");
    act(() => {
      fireEvent.blur(inputPassword);
    });
    await waitFor(() =>
      expect(queryByText(MESSAGES_ERROR.PASSWORD_REQUIRED)).toBeTruthy(),
    );
  });

  it("calls mockFetch signin false by wrong field email after submit signin", async () => {
    jest.useFakeTimers();
    const responseData = {
      message: MESSAGE_SIGN_IN.FAILED,
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      message: "Wrong by input email of user",
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const { getByTestId, queryAllByText } = renderComponent();

    const inputEmail = getByTestId("signin-email");
    const inputPassword = getByTestId("signin-password");

    fireEvent.change(inputEmail, { target: { value: "admin@asnet.com.vn" } });
    expect(inputEmail.value).toEqual("admin@asnet.com.vn");

    fireEvent.change(inputPassword, { target: { value: "admin@123" } });
    expect(inputPassword.value).toEqual("admin@123");

    const btnSubmit = getByTestId("signin-submit");

    expect(btnSubmit.disabled).not.toBeTruthy();

    await act(async () => {
      await fireEvent.click(btnSubmit);
    });

    await waitFor(() => {
      const loadingTexts = queryAllByText("Loading...");
      expect(loadingTexts.length).toBeGreaterThan(0);
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        MESSAGE_SIGN_IN.FAILED,
      ),
    );
    await act(() => {
      jest.runOnlyPendingTimers();
      jest.advanceTimersByTime(3000);
    });
  });

  it("calls mockFetch signin false by wrong password after submit signin", async () => {
    jest.useFakeTimers();
    const responseData = {
      message: MESSAGE_SIGN_IN.FAILED,
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      message: "Wrong by field password",
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const { getByTestId, queryAllByText } = renderComponent();

    const inputEmail = getByTestId("signin-email");
    const inputPassword = getByTestId("signin-password");

    fireEvent.change(inputEmail, { target: { value: "admin@asnet.com.vn" } });
    expect(inputEmail.value).toEqual("admin@asnet.com.vn");

    fireEvent.change(inputPassword, { target: { value: "admin@123" } });
    expect(inputPassword.value).toEqual("admin@123");

    const btnSubmit = getByTestId("signin-submit");

    expect(btnSubmit.disabled).not.toBeTruthy();

    await act(async () => {
      await fireEvent.click(btnSubmit);
    });

    await waitFor(() => {
      const loadingTexts = queryAllByText("Loading...");
      expect(loadingTexts.length).toBeGreaterThan(0);
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        MESSAGE_SIGN_IN.FAILED,
      ),
    );
    await act(() => {
      jest.runOnlyPendingTimers();
      jest.advanceTimersByTime(3000);
    });
  });

  it("calls mockFetch signin success after submit signin", async () => {
    jest.useFakeTimers();
    const responseData = {
      message: MESSAGE_SIGN_IN.SUCCESS,
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      user: {
        email: "admin@asnet.com.vn",
        password: "admin@abcABC",
        remember: false,
      },
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const { getByTestId, queryAllByText } = renderComponent();

    const inputEmail = getByTestId("signin-email");
    const inputPassword = getByTestId("signin-password");

    fireEvent.change(inputEmail, { target: { value: "admin@asnet.com.vn" } });
    expect(inputEmail.value).toEqual("admin@asnet.com.vn");

    fireEvent.change(inputPassword, { target: { value: "admin@123" } });
    expect(inputPassword.value).toEqual("admin@123");

    const btnSubmit = getByTestId("signin-submit");

    expect(btnSubmit.disabled).not.toBeTruthy();

    await act(async () => {
      await fireEvent.click(btnSubmit);
    });

    await waitFor(() => {
      const loadingTexts = queryAllByText("Loading...");
      expect(loadingTexts.length).toBeGreaterThan(0);
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        MESSAGE_SIGN_IN.SUCCESS,
      ),
    );
    await act(() => {
      jest.runOnlyPendingTimers();
      jest.advanceTimersByTime(3000);
    });
  });
});
