import { renderHook, act } from "@testing-library/react";
import { useChatChannelStrip } from "../useChatChannelStrip";
import { useCreateTeam } from "../useCreateTeam";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

// Mock the useCreateTeam hook
jest.mock("../useCreateTeam", () => ({
  useCreateTeam: jest.fn(),
}));

// Mock useSelector
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("useChatChannelStrip", () => {
  const mockOrg = {
    id: "1",
    name: "Test Org",
    admins: ["user1"],
  };

  const mockUser = {
    id: "user1",
    email: "test@example.com",
  };

  const mockRootState = {
    ui: { selectedOrg: mockOrg },
    auth: { user: mockUser },
    user: { orgs: [mockOrg] },
  } as unknown as RootState;

  const mockHandleCreateTeam = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSelector as unknown as jest.Mock).mockImplementation((selector: (state: RootState) => any) => selector(mockRootState));
    (useCreateTeam as jest.Mock).mockReturnValue({
      handleCreateTeam: mockHandleCreateTeam,
    });
  });

  it("should return null when selectedOrg is not available", () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector: (state: RootState) => any) => {
      if (selector.toString().includes('state.ui.selectedOrg')) return null;
      if (selector.toString().includes('state.auth.user')) return mockUser;
      if (selector.toString().includes('state.user.orgs')) return [mockOrg];
      return null;
    });
    const { result } = renderHook(() => useChatChannelStrip());
    expect(result.current).toBeNull();
  });

  it("should return null when user is not available", () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector: (state: RootState) => any) => {
      if (selector.toString().includes('state.ui.selectedOrg')) return mockOrg;
      if (selector.toString().includes('state.auth.user')) return null;
      if (selector.toString().includes('state.user.orgs')) return [mockOrg];
      return null;
    });
    const { result } = renderHook(() => useChatChannelStrip());
    expect(result.current).toBeNull();
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useChatChannelStrip());
    const hookResult = result.current as NonNullable<ReturnType<typeof useChatChannelStrip>>;
    expect(hookResult).toEqual(
      expect.objectContaining({
        isAdding: false,
        newTeamName: "",
        org: mockOrg,
        currentUser: mockUser,
        authorityToCreateNewTeam: true,
      })
    );
  });

  it("should handle keydown events correctly", () => {
    const { result, rerender } = renderHook(() => useChatChannelStrip());

    act(() => {
      result.current!.setNewTeamName("New Team");
    });
    rerender();
    act(() => {
      result.current!.handleKeyDown({ key: "Enter" } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(mockHandleCreateTeam).toHaveBeenCalledWith("New Team", mockUser.email, mockOrg.id);

    act(() => {
      result.current!.handleKeyDown({ key: "Escape" } as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(result.current!.isAdding).toBe(false);
    expect(result.current!.newTeamName).toBe("");
  });

  it("should handle create team input correctly", () => {
    const { result, rerender } = renderHook(() => useChatChannelStrip());

    act(() => {
      result.current!.setNewTeamName("New Team");
    });
    rerender();
    act(() => {
      result.current!.handleCreateTeam();
    });

    expect(mockHandleCreateTeam).toHaveBeenCalledWith(mockOrg.id, "New Team", mockUser.email);
  });

  it("should not create team with empty name", () => {
    const { result } = renderHook(() => useChatChannelStrip());
    const hookResult = result.current as NonNullable<ReturnType<typeof useChatChannelStrip>>;

    act(() => {
      hookResult.setNewTeamName("   ");
      hookResult.handleCreateTeam();
    });

    expect(mockHandleCreateTeam).not.toHaveBeenCalled();
    expect(hookResult.isAdding).toBe(false);
    expect(hookResult.newTeamName).toBe("");
  });

  afterEach(() => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector: (state: RootState) => any) => selector(mockRootState));
  });
}); 