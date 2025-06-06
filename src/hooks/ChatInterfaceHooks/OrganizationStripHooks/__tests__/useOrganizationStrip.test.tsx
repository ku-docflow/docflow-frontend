import { renderHook, act } from "@testing-library/react";
import { useOrganizationStrip } from "../useOrganizationStrip";
import { createOrganization } from "../../../../api/organization";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../../store/slices/authSlice";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

// Mock the createOrganization API
jest.mock("../../../../api/organization", () => ({
  createOrganization: jest.fn(),
}));

// Create a mock store
const createMockStore = (initialState: Partial<AuthState> = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: { 
          id: "1",
          email: "test@example.com",
          first_name: "Test",
          last_name: "User"
        },
        loading: false,
        ...initialState,
      },
    },
  });
};

describe("useOrganizationStrip", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const store = createMockStore();
    return <Provider store={store}>{children}</Provider>;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useOrganizationStrip(), { wrapper });

    expect(result.current.isSettingsOpen).toBe(false);
    expect(result.current.isAdding).toBe(false);
    expect(result.current.newOrgName).toBe("");
  });

  it("should update isSettingsOpen state", () => {
    const { result } = renderHook(() => useOrganizationStrip(), { wrapper });

    act(() => {
      result.current.setIsSettingsOpen(true);
    });

    expect(result.current.isSettingsOpen).toBe(true);
  });

  it("should update isAdding and newOrgName states", () => {
    const { result } = renderHook(() => useOrganizationStrip(), { wrapper });

    act(() => {
      result.current.setIsAdding(true);
      result.current.setNewOrgName("New Org");
    });

    expect(result.current.isAdding).toBe(true);
    expect(result.current.newOrgName).toBe("New Org");
  });

  it("should handle create organization with valid name", async () => {
    const { result } = renderHook(() => useOrganizationStrip(), { wrapper });

    act(() => {
      result.current.setNewOrgName("New Organization");
    });

    await act(async () => {
      await result.current.handleCreateOrg();
    });

    expect(createOrganization).toHaveBeenCalledWith({
      name: "New Organization",
      email: "test@example.com",
    });
    expect(result.current.isAdding).toBe(false);
    expect(result.current.newOrgName).toBe("");
  });

  it("should not create organization with empty name", async () => {
    const { result } = renderHook(() => useOrganizationStrip(), { wrapper });

    act(() => {
      result.current.setNewOrgName("   ");
    });

    await act(async () => {
      await result.current.handleCreateOrg();
    });

    expect(createOrganization).not.toHaveBeenCalled();
    expect(result.current.isAdding).toBe(false);
    expect(result.current.newOrgName).toBe("");
  });

  it("should handle keydown events", () => {
    const { result } = renderHook(() => useOrganizationStrip(), { wrapper });

    act(() => {
      result.current.setNewOrgName("New Org");
    });

    // Test Enter key
    act(() => {
      result.current.handleKeyDown({ key: "Enter" } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(createOrganization).toHaveBeenCalledWith({
      name: "New Org",
      email: "test@example.com",
    });

    // Test Escape key
    act(() => {
      result.current.setNewOrgName("New Org");
      result.current.setIsAdding(true);
      result.current.handleKeyDown({ key: "Escape" } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(result.current.isAdding).toBe(false);
    expect(result.current.newOrgName).toBe("");
  });

  it("should handle create organization error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    (createOrganization as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useOrganizationStrip(), { wrapper });

    act(() => {
      result.current.setNewOrgName("New Org");
    });

    await act(async () => {
      await result.current.handleCreateOrg();
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(result.current.isAdding).toBe(false);
    expect(result.current.newOrgName).toBe("");

    consoleSpy.mockRestore();
  });
}); 