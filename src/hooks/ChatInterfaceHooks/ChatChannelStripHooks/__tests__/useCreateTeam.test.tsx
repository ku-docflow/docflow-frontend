import { renderHook } from "@testing-library/react";
import { useCreateTeam } from "../useCreateTeam";
import { createTeam } from "../../../../api/team";

// Mock the createTeam API function
jest.mock("../../../../api/team", () => ({
  createTeam: jest.fn(),
}));

describe("useCreateTeam", () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call createTeam with correct parameters", async () => {
    const { result } = renderHook(() => useCreateTeam(mockOnSuccess));
    const mockTeamData = {
      name: "Test Team",
      email: "test@example.com",
      organization_id: 1,
    };

    await result.current.handleCreateTeam(
      mockTeamData.name,
      mockTeamData.email,
      mockTeamData.organization_id.toString()
    );

    expect(createTeam).toHaveBeenCalledWith(mockTeamData);
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it("should handle errors when creating team", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    const mockError = new Error("Failed to create team");
    (createTeam as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCreateTeam(mockOnSuccess));

    await result.current.handleCreateTeam("Test Team", "test@example.com", "1");

    expect(consoleSpy).toHaveBeenCalledWith("Failed to create team:", mockError);
    expect(mockOnSuccess).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should work without onSuccess callback", async () => {
    const { result } = renderHook(() => useCreateTeam());
    const mockTeamData = {
      name: "Test Team",
      email: "test@example.com",
      organization_id: 1,
    };

    await result.current.handleCreateTeam(
      mockTeamData.name,
      mockTeamData.email,
      mockTeamData.organization_id.toString()
    );

    expect(createTeam).toHaveBeenCalledWith(mockTeamData);
  });
}); 