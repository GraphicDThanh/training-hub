// Libs
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";

// Components
import { AddUserForm } from ".";

// Constants
import { ADMIN_ID } from "@/constants";

// Mocks
import { MOCK_USERS } from "@/mocks";

jest.mock("next/navigation", () => {
  const actual = jest.mock("next/navigation");
  return {
    ...actual,
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      replace: jest.fn(),
    })),
    useSearchParams: jest.fn(() => ({ get: jest.fn(() => "mockPage") })),
    usePathname: jest.fn(),
  };
});

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// Common setup function
const setup = (props?: { userId?: number }) =>
  render(<AddUserForm userId={props?.userId ?? ADMIN_ID} />);

describe("AddUserForm", () => {
  const { name, email, password, bio, twitterUrl, facebookUrl, instagramUrl } =
    MOCK_USERS[0];

  it("should render successfully in User Info Form", async () => {
    const { container, getByLabelText, getByTestId, getAllByTestId } = setup();

    // FORM 1
    fireEvent.change(getByLabelText("Name"), { target: { value: name } });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: email },
    });
    fireEvent.click(getByTestId("year").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[1]);
    fireEvent.click(getByTestId("month").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[2]);
    fireEvent.click(getByTestId("date").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[3]);

    fireEvent.change(getByLabelText("Password"), {
      target: { value: password },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: password },
    });

    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(name);
    expect((getByLabelText("Email") as HTMLInputElement).value).toBe(email);
    expect(
      getByTestId("year").firstElementChild?.firstElementChild?.textContent,
    ).toBe("1901");
    expect(
      getByTestId("month").firstElementChild?.firstElementChild?.textContent,
    ).toBe("March");
    expect(
      getByTestId("date").firstElementChild?.firstElementChild?.textContent,
    ).toBe("4");
    expect((getByLabelText("Password") as HTMLInputElement).value).toBe(
      password,
    );
    expect((getByLabelText("Confirm Password") as HTMLInputElement).value).toBe(
      password,
    );

    fireEvent.submit(container.querySelector("#user-info-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("step-content-2").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );
  });

  it("should render successfully in Profile Form", async () => {
    const { container, getByLabelText, getByTestId, getAllByTestId } = setup();

    // FORM 1
    fireEvent.change(getByLabelText("Name"), { target: { value: name } });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: email },
    });
    fireEvent.click(getByTestId("year").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[1]);
    fireEvent.click(getByTestId("month").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[2]);
    fireEvent.click(getByTestId("date").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[3]);
    fireEvent.change(getByLabelText("Password"), {
      target: { value: password },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: password },
    });

    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(name);
    expect((getByLabelText("Email") as HTMLInputElement).value).toBe(email);
    expect(
      getByTestId("year").firstElementChild?.firstElementChild?.textContent,
    ).toBe("1901");
    expect(
      getByTestId("month").firstElementChild?.firstElementChild?.textContent,
    ).toBe("March");
    expect(
      getByTestId("date").firstElementChild?.firstElementChild?.textContent,
    ).toBe("4");
    expect((getByLabelText("Password") as HTMLInputElement).value).toBe(
      password,
    );
    expect((getByLabelText("Confirm Password") as HTMLInputElement).value).toBe(
      password,
    );

    fireEvent.submit(container.querySelector("#user-info-form") as Element);

    await waitFor(() =>
      getByTestId("step-content-2").querySelector(
        "span[class='stepper-dot-active']",
      ),
    );

    // FORM 2
    await waitFor(() => container.querySelector("#profile-form"));

    fireEvent.change(container.querySelector(".ql-editor") as Element, {
      target: { textContent: bio },
    });

    fireEvent.submit(container.querySelector("#profile-form") as Element);

    await waitFor(() =>
      expect(
        getByTestId("last-step-content").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot-active"),
    );
  });

  it("should render successfully in Social Form", async () => {
    const { container, getByLabelText, getByTestId, getAllByTestId } = setup();

    const responseData = { success: true };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    // FORM 1:
    fireEvent.change(getByLabelText("Name"), { target: { value: name } });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: email },
    });
    fireEvent.click(getByTestId("year").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[1]);
    fireEvent.click(getByTestId("month").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[2]);
    fireEvent.click(getByTestId("date").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[3]);
    fireEvent.change(getByLabelText("Password"), {
      target: { value: password },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: password },
    });

    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(name);
    expect((getByLabelText("Email") as HTMLInputElement).value).toBe(email);
    expect(
      getByTestId("year").firstElementChild?.firstElementChild?.textContent,
    ).toBe("1901");
    expect(
      getByTestId("month").firstElementChild?.firstElementChild?.textContent,
    ).toBe("March");
    expect(
      getByTestId("date").firstElementChild?.firstElementChild?.textContent,
    ).toBe("4");
    expect((getByLabelText("Password") as HTMLInputElement).value).toBe(
      password,
    );
    expect((getByLabelText("Confirm Password") as HTMLInputElement).value).toBe(
      password,
    );

    fireEvent.submit(container.querySelector("#user-info-form") as Element);

    await waitFor(() =>
      getByTestId("step-content-2").querySelector(
        "span[class='stepper-dot-active']",
      ),
    );

    // FORM 2:
    await waitFor(() => container.querySelector("#profile-form"));

    fireEvent.change(container.querySelector(".ql-editor") as Element, {
      target: { textContent: bio },
    });

    fireEvent.submit(container.querySelector("#profile-form") as Element);

    await waitFor(() =>
      getByTestId("last-step-content").querySelector(
        "span[class='stepper-dot-active']",
      ),
    );

    // FORM 3
    await waitFor(() => container.querySelector("#social-form"));

    fireEvent.change(getByLabelText("Twitter Handle"), {
      target: { value: twitterUrl },
    });
    fireEvent.change(getByLabelText("Facebook Account"), {
      target: { value: facebookUrl },
    });
    fireEvent.change(getByLabelText("Instagram Account"), {
      target: { value: instagramUrl },
    });

    fireEvent.submit(container.querySelector("#social-form") as Element);

    expect(container).toMatchSnapshot();
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
  });

  it("should render success toast when message null", async () => {
    const { container, getByLabelText, getByTestId, getAllByTestId } = setup();

    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: () => Promise.resolve({ message: "Error" }),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    // FORM 1:
    fireEvent.change(getByLabelText("Name"), { target: { value: name } });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: email },
    });

    fireEvent.click(getByTestId("year").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[1]);
    fireEvent.click(getByTestId("month").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[2]);
    fireEvent.click(getByTestId("date").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[3]);
    fireEvent.change(getByLabelText("Password"), {
      target: { value: password },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: password },
    });

    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(name);
    expect((getByLabelText("Email") as HTMLInputElement).value).toBe(email);
    expect(
      getByTestId("year").firstElementChild?.firstElementChild?.textContent,
    ).toBe("1901");
    expect(
      getByTestId("month").firstElementChild?.firstElementChild?.textContent,
    ).toBe("March");
    expect(
      getByTestId("date").firstElementChild?.firstElementChild?.textContent,
    ).toBe("4");
    expect((getByLabelText("Password") as HTMLInputElement).value).toBe(
      password,
    );
    expect((getByLabelText("Confirm Password") as HTMLInputElement).value).toBe(
      password,
    );

    fireEvent.submit(container.querySelector("#user-info-form") as Element);

    await waitFor(() =>
      getByTestId("step-content-2").querySelector(
        "span[class='stepper-dot-active']",
      ),
    );

    // FORM 2:
    await waitFor(() => container.querySelector("#profile-form"));

    fireEvent.change(container.querySelector(".ql-editor") as Element, {
      target: { textContent: bio },
    });

    fireEvent.submit(container.querySelector("#profile-form") as Element);

    await waitFor(() =>
      getByTestId("last-step-content").querySelector(
        "span[class='stepper-dot-active']",
      ),
    );

    // FORM 3
    await waitFor(() => container.querySelector("#social-form"));

    fireEvent.change(getByLabelText("Twitter Handle"), {
      target: { value: twitterUrl },
    });
    fireEvent.change(getByLabelText("Facebook Account"), {
      target: { value: facebookUrl },
    });
    fireEvent.change(getByLabelText("Instagram Account"), {
      target: { value: instagramUrl },
    });

    fireEvent.submit(container.querySelector("#social-form") as Element);
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
  });

  it("should calls back step", async () => {
    const { container, getByLabelText, getByTestId, getAllByTestId } = setup();

    // FORM 1
    fireEvent.change(getByLabelText("Name"), { target: { value: name } });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: email },
    });
    fireEvent.click(getByTestId("year").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[1]);
    fireEvent.click(getByTestId("month").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[2]);
    fireEvent.click(getByTestId("date").firstElementChild as Element);
    fireEvent.click(getAllByTestId("select-option")[3]);
    fireEvent.change(getByLabelText("Password"), {
      target: { value: password },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: password },
    });

    expect((getByLabelText("Name") as HTMLInputElement).value).toBe(name);
    expect((getByLabelText("Email") as HTMLInputElement).value).toBe(email);
    expect(
      getByTestId("year").firstElementChild?.firstElementChild?.textContent,
    ).toBe("1901");
    expect(
      getByTestId("month").firstElementChild?.firstElementChild?.textContent,
    ).toBe("March");
    expect(
      getByTestId("date").firstElementChild?.firstElementChild?.textContent,
    ).toBe("4");
    expect((getByLabelText("Password") as HTMLInputElement).value).toBe(
      password,
    );
    expect((getByLabelText("Confirm Password") as HTMLInputElement).value).toBe(
      password,
    );

    fireEvent.submit(container.querySelector("#user-info-form") as Element);

    await waitFor(() =>
      getByTestId("step-content-2").querySelector(
        "span[class='stepper-dot-active']",
      ),
    );

    // FORM 2
    await waitFor(() => container.querySelector("#profile-form"));

    fireEvent.click(getByTestId("back-button"));

    await waitFor(() =>
      expect(
        getByTestId("step-content-2").querySelectorAll("span")[1].className,
      ).toBe("stepper-dot"),
    );
  });
});
