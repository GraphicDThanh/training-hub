// Services
import { authenticationLogin } from "@/services/authenticationLogin";

// Helpers
import { getFormData } from "@/helpers";

import { signIn } from "@/config/auth";

jest.mock("@/config/auth", () => ({
  signIn: jest.fn(),
}));

describe("authenticationLogin", () => {
  it("should check signIn called if authenticationLogin was called", async () => {
    const inputObject = {
      name: "admin",
      email: "admin@asnet.com.vn",
    };
    const formData = getFormData(inputObject);

    expect(formData).toBeInstanceOf(FormData);

    await authenticationLogin(formData);

    expect(signIn).toHaveBeenCalled();
  });
});
