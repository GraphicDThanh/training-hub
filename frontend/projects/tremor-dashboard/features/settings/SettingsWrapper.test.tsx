import { fireEvent, render, waitFor } from "@testing-library/react";

// Mocks
import { MOCK_USERS } from "@/mocks";

// Components
import { SettingsWrapper } from ".";

describe("SettingsWrapper", () => {
  it("Match snapshot", () => {
    const { container } = render(<SettingsWrapper user={MOCK_USERS[0]} />);

    expect(container).toMatchSnapshot();
  });

  it("Calls submit form successful", async () => {
    const responseData = { success: true };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(responseData),
    };
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    const { container, getByTestId, getAllByTestId } = render(
      <SettingsWrapper user={MOCK_USERS[0]} />,
    );

    fireEvent.change(container.querySelector("#name") as HTMLInputElement, {
      target: { value: MOCK_USERS[1].name },
    });
    fireEvent.click(getByTestId("gender").firstElementChild as HTMLElement);
    fireEvent.click(getAllByTestId("select-option")[1]);
    fireEvent.click(getByTestId("year").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[1]);
    fireEvent.click(getByTestId("month").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[2]);
    fireEvent.click(getByTestId("date").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[3]);
    fireEvent.submit(
      container.querySelector("#basicInfoForm") as HTMLFormElement,
    );

    expect(
      (container.querySelector("#name") as HTMLInputElement).defaultValue,
    ).toBe(MOCK_USERS[1].name);
    expect(
      getByTestId("gender").firstElementChild?.firstElementChild?.textContent,
    ).toBe("Female");
    expect(
      getByTestId("year").firstElementChild?.firstElementChild?.textContent,
    ).toBe("1901");
    expect(
      getByTestId("month").firstElementChild?.firstElementChild?.textContent,
    ).toBe("March");
    expect(
      getByTestId("date").firstElementChild?.firstElementChild?.textContent,
    ).toBe("4");

    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        "Edit user successfully",
      ),
    );
  });

  it("Calls submit form failed", async () => {
    const mockResponse = {
      ok: false,
      json: jest
        .fn()
        .mockResolvedValue({ message: '"email" is not allowed to be empty' }),
    };
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue(mockResponse);
    const { container, getByTestId } = render(
      <SettingsWrapper user={MOCK_USERS[0]} />,
    );

    fireEvent.change(container.querySelector("#name") as HTMLInputElement, {
      target: { value: MOCK_USERS[1].name },
    });

    fireEvent.submit(
      container.querySelector("#basicInfoForm") as HTMLFormElement,
    );

    await waitFor(() =>
      expect(getByTestId("messageToast").textContent).toBe(
        "Failed to edit user",
      ),
    );
  });
});
