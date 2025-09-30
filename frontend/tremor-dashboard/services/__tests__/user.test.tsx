// Services
import {
  logIn,
  signUp,
  getUsers,
  getUserById,
  getUserProjects,
  addNewUser,
  editUser,
  updatePinCode,
  getUsersPagination,
  getCurrentUser,
} from "@/services";

// Mocks
import { PROJECT_DATA, MOCK_USERS } from "@/mocks";

jest.mock("@/services/firebase", () => ({
  updateDataFirestore: jest.fn(),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockReturnValue({
      value: 101,
    }),
  })),
}));

describe("user of services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const formData = {
    email: "admin@asnet.com.vn",
    password: "admin@ABCabc123",
  };

  it("should call fetch data if logIn is called", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: formData,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const resLogIn = await logIn(formData);
    const { errorMessage, user } = resLogIn;
    expect(mockFetch).toHaveBeenCalled();
    expect(errorMessage).toEqual(null);
    expect(user.data).toEqual(formData);
  });

  it("should call fetch data with an error if call logIn falsed", async () => {
    const responseData = {
      message: "Fetch false",
      user: null,
    };
    const mockFetch = jest.fn();

    const mockResponse = {
      ok: false,
      data: formData,
      json: () => responseData,
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const loginRes = await logIn(formData);
    const { user, errorMessage } = loginRes;
    expect(mockFetch).toHaveBeenCalled();
    expect(user).toEqual(null);
    expect(errorMessage).toEqual("Fetch false");
  });

  it("should call fetch to catch new Error if call logIn falsed", async () => {
    const errorMessage: string = "Network Error";
    const formData = {
      email: "admin@asnet.com.vn",
      password: "admin@ABCabc123",
    };
    const mockFetch = jest.fn();

    // Mock fetch
    global.fetch = mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    const loginRes = await logIn(formData);
    expect(mockFetch).toHaveBeenCalled();
    expect(loginRes.user).toEqual(null);
    expect(loginRes.errorMessage).toEqual("Network Error");
  });

  it("should call fetch to catch an object error if call logIn falsed", async () => {
    const responseData = {};
    const formData = {
      email: "admin@asnet.com.vn",
      password: "admin@ABCabc123",
    };
    const mockFetch = jest.fn();

    // Mock fetch
    global.fetch = mockFetch.mockRejectedValueOnce(responseData);

    const loginRes = await logIn(formData);
    expect(mockFetch).toHaveBeenCalled();
    expect(loginRes.user).toEqual(null);
    expect(loginRes.errorMessage).toBeTruthy();
  });

  it("should call fetch data if signUp is called successfully then errorMessage is null", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: formData,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const signUpRes = await signUp(formData);
    expect(mockFetch).toHaveBeenCalled();
    expect(signUpRes.errorMessage).toEqual(null);
  });

  it("should call fetch data with status error if signUp is called and falsed", async () => {
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      status: 400,
      message: "Fetch false",
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const signUpRes = await signUp(formData);
    expect(mockFetch).toHaveBeenCalled();
    expect(signUpRes.user).toEqual(null);
    expect(signUpRes.errorMessage).toEqual("Fetch false");
  });

  it("should call fetch to catch an object error if call signUp falsed", async () => {
    const responseData = {
      error: { message: "Fetch signUp falsed" },
    };
    const formData = {
      email: "admin@asnet.com.vn",
      password: "admin@ABCabc123",
    };
    const mockFetch = jest.fn();

    // Mock fetch
    global.fetch = mockFetch.mockRejectedValueOnce(responseData);

    const signUpRes = await signUp(formData);
    expect(mockFetch).toHaveBeenCalled();
    expect(signUpRes.errorMessage).toBeTruthy();
  });

  it("should call fetch to catch new Error if call signUp falsed", async () => {
    const errorMessage: string = "Network Error";
    const formData = {
      email: "admin@asnet.com.vn",
      password: "admin@ABCabc123",
    };
    const mockFetch = jest.fn();

    // Mock fetch
    global.fetch = mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    const signUpRes = await signUp(formData);
    expect(mockFetch).toHaveBeenCalled();
    expect(signUpRes.errorMessage).toEqual("Network Error");
  });

  it("should call fetch data if getUsers is called", async () => {
    const usersData = [
      {
        id: 1,
        name: "user1",
        email: "user1@gmail.com",
        password: "user1",
        remember: true,
        agreeTerms: false,
      },
      {
        id: 2,
        name: "user2",
        email: "user2@gmail.com",
        password: "user2",
        remember: false,
        agreeTerms: false,
      },
    ];
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: usersData,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const getUsersRes = await getUsers();
    expect(mockFetch).toHaveBeenCalled();
    expect(getUsersRes.data).toEqual(usersData);
  });

  it("should throw an error if call getUsers falsed", async () => {
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    expect(async () => {
      await getUsers();
    }).rejects.toThrow();
  });

  it("should call fetch data if getUserById is called", async () => {
    const dataUser = {
      id: 1,
      name: "user1",
      email: "user1@gmail.com",
      password: "user1",
      remember: true,
      agreeTerms: false,
    };
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: dataUser,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const resGetUser = await getUserById(1);
    expect(mockFetch).toHaveBeenCalled();
    expect(resGetUser.data).toEqual(dataUser);
  });

  it("should throw an error if call getUserById falsed", async () => {
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    expect(async () => {
      await getUserById(1);
    }).rejects.toThrow();
  });

  it("should call fetch data if getUserProjects is called", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: PROJECT_DATA,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const getUserProjectsRes = await getUserProjects(1);
    expect(mockFetch).toHaveBeenCalled();
    expect(getUserProjectsRes.data).toEqual(PROJECT_DATA);
  });

  it("should throw an error if call getUserProjects falsed", async () => {
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    expect(async () => {
      await getUserProjects(1);
    }).rejects.toThrow();
  });

  it("should call fetch data with message is undefined if addNewUser is called", async () => {
    const newUser = {
      name: "",
      email: "",
      birthday: "",
      phoneNumber: "",
      gender: 0,
      password: "",
      confirmPassword: "",
      avatar: "",
      twitterUrl: "",
      facebookUrl: "",
      instagramUrl: "",
      bio: "",
      skills: [],
      location: "",
      agreeTerms: true,
      language: "",
    };
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const resAddNewUser = await addNewUser(newUser, 1);
    expect(mockFetch).toHaveBeenCalled();
    expect(resAddNewUser.message).toEqual(undefined);
  });

  it("should call fetch data if call addNewUser falsed", async () => {
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      message: "Fetch false",
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const resAddNewUser = await addNewUser({}, 1);
    expect(mockFetch).toHaveBeenCalled();
    expect(resAddNewUser.message).toEqual("Fetch false");
  });

  it("should call fetch data if editUser is called", async () => {
    const dataUser = {
      name: "",
      email: "",
      birthday: "",
      phoneNumber: "",
      gender: 0,
      password: "",
      confirmPassword: "",
      avatar: "",
      twitterUrl: "",
      facebookUrl: "",
      instagramUrl: "",
      bio: "",
      skills: [],
      location: "",
      agreeTerms: true,
      language: "",
    };
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      user: { ...dataUser, name: "UserAdmin" },
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const editUserRes = await editUser(1, 1, dataUser);
    expect(mockFetch).toHaveBeenCalled();
    expect(editUserRes.errorMessages).toEqual([]);
    expect(editUserRes.data.user).toEqual(mockResponse.user);
  });

  it("should show error if call editUser falsed", async () => {
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      errors: [{ error: "Fetch false" }],
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const result = await editUser(1, 1, {});
    expect(result.errorMessages[0]?.error).toEqual("Fetch false");
    expect(result.data).toEqual(null);
  });

  it("should show error message if fetch data is falsed when updatePinCode is called", async () => {
    const responseData = {
      message: "Fetch false",
    };

    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      message: "Fetch false",
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const updatePinCoderRes = await updatePinCode("1234");
    expect(mockFetch).toHaveBeenCalled();
    expect(updatePinCoderRes.errorMessage).toEqual("Fetch false");
  });

  it("should call fetch data and errorMessage is null if updatePinCode is called", async () => {
    jest.requireMock("next/headers").cookies = jest
      .fn()
      .mockImplementation(() => ({
        get: jest.fn().mockReturnValue({
          value: 101,
        }),
      }));
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const updatePinCodeRes = await updatePinCode("1234");
    expect(updatePinCodeRes.errorMessage).toEqual(null);
  });

  it("should throw an error if get UID_KEY is undefined when updatePinCode is called  ", async () => {
    jest.requireMock("next/headers").cookies = jest
      .fn()
      .mockImplementation(() => ({
        get: jest.fn(),
      }));

    expect(async () => {
      await updatePinCode("1234");
    }).rejects.toThrow();
  });

  it("should call fetch data if getUsersPagination is called with page param less than 1", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      results: MOCK_USERS,
      total: 1,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const params = {
      page: 1,
    };
    const getUsersPageRes = await getUsersPagination(params);
    const { results, total } = getUsersPageRes;
    expect(mockFetch).toHaveBeenCalled();
    expect(results).toEqual(MOCK_USERS);
    expect(total).toEqual(1);
  });

  it("should call fetch data if getUsersPagination is called with page param greater than 1", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      results: MOCK_USERS,
      total: 3,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const params = {
      page: 3,
      size: 1,
      query: "1",
      sortBy: "",
    };
    const getUsersPageRes = await getUsersPagination(params);
    const { results, total } = getUsersPageRes;
    expect(mockFetch).toHaveBeenCalled();
    expect(results).toEqual(MOCK_USERS);
    expect(total).toEqual(3);
  });

  it("should throw error if call fetch data is falsed when getUsersPagination is called", async () => {
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);
    const params = {
      page: 2,
    };

    expect(async () => {
      await getUsersPagination(params);
    }).rejects.toThrow();
  });

  it("should not call fetch data if getCurrentUser is called with value mock UID_KEY is undefined", async () => {
    jest.requireMock("next/headers").cookies = jest
      .fn()
      .mockImplementation(() => ({
        get: jest.fn(),
      }));
    const dataUser = {
      name: "",
      email: "",
      birthday: "",
      phoneNumber: "",
      gender: 0,
      password: "",
      confirmPassword: "",
      avatar: "",
      twitterUrl: "",
      facebookUrl: "",
      instagramUrl: "",
      bio: "",
      skills: [],
      location: "",
      agreeTerms: true,
      language: "",
    };
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const getCurrentUserRes = await getCurrentUser(dataUser);
    expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(getCurrentUserRes).toEqual(null);
  });

  it("should call fetch data if getCurrentUser is called", async () => {
    jest.requireMock("next/headers").cookies = jest
      .fn()
      .mockImplementation(() => ({
        get: jest.fn().mockReturnValue({
          value: 101,
        }),
      }));
    const responseData = {
      message: "Fetch success",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      name: "Admin",
      email: "admin@asnet.com.vn",
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const getCurrentUserRes = await getCurrentUser();
    const { name, email } = getCurrentUserRes;
    expect(mockFetch).toHaveBeenCalled();
    expect(name).toEqual("Admin");
    expect(email).toEqual("admin@asnet.com.vn");
  });

  it("should throw an error if call getCurrentUser falsed with value mock UID_KEY is 101", async () => {
    jest.requireMock("next/headers").cookies = jest
      .fn()
      .mockImplementation(() => ({
        get: jest.fn().mockReturnValue({
          value: 101,
        }),
      }));
    const responseData = {
      message: "Fetch false",
    };
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: false,
      json: mockFetch.mockResolvedValue(responseData),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    expect(async () => {
      await getCurrentUser();
    }).rejects.toThrow();
  });

  it("should call fetch empty data if getCurrentUser is called with value mock UID_KEY is 101", async () => {
    jest.requireMock("next/headers").cookies = jest
      .fn()
      .mockImplementation(() => ({
        get: jest.fn().mockReturnValue({
          value: 101,
        }),
      }));
    const mockFetch = jest.fn();
    const mockResponse = {
      ok: true,
      data: {},
      json: mockFetch.mockResolvedValue(null),
    };

    // Mock fetch
    global.fetch = mockFetch.mockResolvedValue(mockResponse);

    const getCurrentUserRes = await getCurrentUser();
    expect(mockFetch).toHaveBeenCalled();
    expect(getCurrentUserRes).toEqual(null);
  });
});
