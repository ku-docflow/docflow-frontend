import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import useExtractTopicsOfOrgs from "../useExtractTopicsOfOrgs";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("useExtractTopicsOfOrgs", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return topics for selected organization", () => {
    (useSelector as unknown as jest.Mock)
      .mockImplementationOnce(() => ({ id: 1 })) // selectedOrg
      .mockImplementationOnce(() => [
        {
          organization: { id: 1 },
          topics: [
            { topic: { id: 10, title: "Topic 1" } },
            { topic: { id: 11, title: "Topic 2" } },
          ],
        },
        {
          organization: { id: 2 },
          topics: [{ topic: { id: 20, title: "Other Org Topic" } }],
        },
      ]);
    const { result } = renderHook(() => useExtractTopicsOfOrgs());
    expect(result.current).toEqual([
      { topic_title: "Topic 1", topic_id: 10 },
      { topic_title: "Topic 2", topic_id: 11 },
    ]);
  });

  it("should return undefined if no org is selected", () => {
    (useSelector as unknown as jest.Mock)
      .mockImplementationOnce(() => null) // selectedOrg
      .mockImplementationOnce(() => []); // docHierarchy
    const { result } = renderHook(() => useExtractTopicsOfOrgs());
    expect(result.current).toBeUndefined();
  });

  it("should return undefined if org not found", () => {
    (useSelector as unknown as jest.Mock)
      .mockImplementationOnce(() => ({ id: 3 })) // selectedOrg
      .mockImplementationOnce(() => [
        {
          organization: { id: 1 },
          topics: [{ topic: { id: 10, title: "Topic 1" } }],
        },
      ]);
    const { result } = renderHook(() => useExtractTopicsOfOrgs());
    expect(result.current).toBeUndefined();
  });
});
