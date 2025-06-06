import { submitSignUpForm } from "../submitSignUpForm";
import { auth } from "../../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { login } from "../../../api/auth";

// Mock all required dependencies
jest.mock("../../../services/firebase", () => ({
  auth: {},
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("../../../api/auth", () => ({
  login: jest.fn(),
}));

describe("submitSignUpForm", () => {
  // Test data matching SignUpData interface
  const mockSignUpData = {
    email: "test@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    changeName: jest.fn(),
  };

  // Mock Firebase user with getIdToken
  const mockFirebaseUser = {
    getIdToken: jest.fn().mockResolvedValue("mock-token"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create Firebase user and get token", async () => {
    // Setup mocks
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mockFirebaseUser,
    });

    // Call the function
    await submitSignUpForm(mockSignUpData);

    // Verify Firebase user creation
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      mockSignUpData.email,
      mockSignUpData.password
    );

    // Verify token was obtained
    expect(mockFirebaseUser.getIdToken).toHaveBeenCalled();
  });
});
