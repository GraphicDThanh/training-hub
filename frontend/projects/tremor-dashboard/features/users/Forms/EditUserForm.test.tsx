// Libs
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";

// Components
import { EditUserForm } from ".";

// Mocks
import { MOCK_USERS } from "@/mocks";

// Constants
import { ADMIN_ID, NOT_FOUND_IMAGE } from "@/constants";

// Types
import { User } from "@/types";

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

describe("EditUserForm", () => {
  const responseData = { success: true };
  const mockFetch = jest.fn();
  const mockResponse = {
    ok: true,
    json: mockFetch.mockResolvedValue(responseData),
  };

  // Mock fetch
  global.fetch = mockFetch.mockResolvedValue(mockResponse);

  // Common setup function
  const setup = ({
    id = 545,
    requestedId = ADMIN_ID,
    userData = MOCK_USERS[0],
  }: {
    id?: number;
    requestedId?: number;
    userData?: User;
  }) =>
    render(
      <EditUserForm id={id} requestedId={requestedId} userData={userData} />,
    );

  it("should render correctly successfully in Edit Info Form", async () => {
    const { container, getByLabelText } = setup({});
    const { name, email, password, twitterUrl, facebookUrl, instagramUrl } =
      MOCK_USERS[0];

    // Form UserInfo
    fireEvent.change(getByLabelText("Name"), {
      target: { value: name },
    });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: email },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: password },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: password },
    });

    // Form Social
    fireEvent.change(getByLabelText("Twitter Handle"), {
      target: { value: twitterUrl },
    });
    fireEvent.change(getByLabelText("Facebook Account"), {
      target: { value: facebookUrl },
    });
    fireEvent.change(getByLabelText("Instagram Account"), {
      target: { value: instagramUrl },
    });

    fireEvent.submit(container.querySelector("#edit-user-form") as Element);

    expect(container).toMatchSnapshot();
  });

  it("Should render correctly with user empty avatar and empty bio", async () => {
    const { container } = setup({ userData: { ...MOCK_USERS[0], avatar: "" } });

    expect(container).toMatchSnapshot();
  });

  it("On click remove", async () => {
    const { container, getByText } = setup({});

    fireEvent.click(getByText("Remove Image"));

    fireEvent.submit(container.querySelector("#edit-user-form") as Element);

    waitFor(() => {
      expect(container.querySelector("img")?.src).toContain(NOT_FOUND_IMAGE);
    });
  });
});
