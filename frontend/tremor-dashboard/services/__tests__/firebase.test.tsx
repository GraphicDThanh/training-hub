// Services
import { updateDataFirestore } from "@/services";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

const mockedSetDoc = jest.fn();

jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  getFirestore: jest.fn(),
  doc: jest.fn(),
  setDoc: () => mockedSetDoc(),
}));

describe("firebase services", () => {
  it("should expect setDoc is called if updateDataFirestore called", async () => {
    await updateDataFirestore({
      data: { email: "admin@asnet.com.vn", name: "Admin" },
      entity: "users",
      id: 1,
    });

    expect(mockedSetDoc).toHaveBeenCalled();
  });
});
