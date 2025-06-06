import { fetchAndStoreDocumentHierarchy } from "../fetchUtils";
import { InitUserResponse } from "../../../types/user";
import { Topic } from "../../../types/topic";
import { Document } from "../../../types/document";

// Mock the API calls and Redux
jest.mock("../../../api/topic", () => ({
  fetchTopicsByOrg: jest.fn(),
}));

jest.mock("../../../api/document", () => ({
  fetchDocumentsByTopic: jest.fn(),
}));

jest.mock("../../../store/slices/documentSlice", () => ({
  setDocumentHierarchy: jest.fn(),
}));

// Import mocked functions
import { fetchTopicsByOrg } from "../../../api/topic";
import { fetchDocumentsByTopic } from "../../../api/document";
import { setDocumentHierarchy } from "../../../store/slices/documentSlice";

describe("fetchUtils", () => {
  const mockDispatch = jest.fn();
  const mockInitData: InitUserResponse = {
    user: {
      id: "1",
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      search_bot_chatroom_id: "1",
    },
    orgs: [
      {
        id: "1",
        name: "Org 1",
        admins: ["1"],
        teams: [],
      },
    ],
  };

  const mockTopics: Topic[] = [
    {
      id: 1,
      organization_id: 1,
      title: "Topic 1",
      created_at: "2024-03-15T00:00:00Z",
    },
    {
      id: 2,
      organization_id: 1,
      title: "Topic 2",
      created_at: "2024-03-15T00:00:00Z",
    },
  ];

  const mockDocuments: Document[] = [
    {
      id: 1,
      topic_id: 1,
      text: "Doc 1",
      created_at: "2024-03-15T00:00:00Z",
    },
    {
      id: 2,
      topic_id: 1,
      text: "Doc 2",
      created_at: "2024-03-15T00:00:00Z",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (fetchTopicsByOrg as jest.Mock).mockResolvedValue(mockTopics);
    (fetchDocumentsByTopic as jest.Mock).mockResolvedValue(mockDocuments);
  });

  describe("fetchAndStoreDocumentHierarchy", () => {
    it("should fetch and store document hierarchy successfully", async () => {
      await fetchAndStoreDocumentHierarchy(mockInitData, mockDispatch);

      // Verify API calls
      expect(fetchTopicsByOrg).toHaveBeenCalledWith(1);
      expect(fetchDocumentsByTopic).toHaveBeenCalledWith(1);

      // Verify Redux action
      expect(setDocumentHierarchy).toHaveBeenCalledWith([
        {
          organization: mockInitData.orgs[0],
          topics: [
            { topic: mockTopics[0], documents: mockDocuments },
            { topic: mockTopics[1], documents: mockDocuments },
          ],
        },
      ]);
      expect(mockDispatch).toHaveBeenCalled();
    });

    it("should handle API errors gracefully", async () => {
      const error = new Error("API Error");
      (fetchTopicsByOrg as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        fetchAndStoreDocumentHierarchy(mockInitData, mockDispatch)
      ).rejects.toThrow("API Error");

      expect(fetchTopicsByOrg).toHaveBeenCalledWith(1);
      expect(fetchDocumentsByTopic).not.toHaveBeenCalled();
      expect(setDocumentHierarchy).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("should handle empty organizations", async () => {
      const emptyInitData: InitUserResponse = {
        ...mockInitData,
        orgs: [],
      };

      await fetchAndStoreDocumentHierarchy(emptyInitData, mockDispatch);

      expect(fetchTopicsByOrg).not.toHaveBeenCalled();
      expect(fetchDocumentsByTopic).not.toHaveBeenCalled();
      expect(setDocumentHierarchy).toHaveBeenCalledWith([]);
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
