import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mocks
import { MOCK_USERS } from "@/mocks";

// Components
import BasicInfoForm from "./BasicInfoForm";

describe("BasicInfoForm", () => {
  const mockOnSubmit = jest.fn();
  const user = MOCK_USERS[0];
  const { name, phoneNumber } = user;

  it("Match snapshot", () => {
    const { container } = render(
      <BasicInfoForm
        onSubmit={mockOnSubmit}
        user={user}
        isLoading
        errorsResponseAPI={[{ message: '"email" is not allowed to be empty' }]}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("calls save, onBlur for name field, and change value of phone number field", async () => {
    const { container } = render(
      <BasicInfoForm onSubmit={mockOnSubmit} user={user} />,
    );
    const queryElement = (id: string): HTMLInputElement | HTMLFormElement =>
      container.querySelector(`#${id}`) as HTMLInputElement | HTMLFormElement;

    fireEvent.change(queryElement("name"), {
      target: { value: name },
    });
    fireEvent.blur(queryElement("name"), {
      target: { value: name },
    });
    fireEvent.change(queryElement("phoneNumber"), {
      target: { value: phoneNumber },
    });

    fireEvent.submit(queryElement("basicInfoForm"));

    expect(queryElement("name").value).toBe(name);
    expect(queryElement("phoneNumber").value).toBe("(847) 636-5113");

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });
});
