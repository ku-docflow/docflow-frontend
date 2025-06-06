import { createMentionData } from "../mentionUtils";
import { Peer } from "../../../types/user";

describe("mentionUtils", () => {
  const mockPeers: Peer[] = [
    {
      id: "1",
      first_name: "John",
      last_name: "Doe",
      chatroom_id: "1",
      online: true,
    },
    {
      id: "2",
      first_name: "Jane",
      last_name: "Smith",
      chatroom_id: "2",
      online: false,
    },
  ];

  describe("createMentionData", () => {
    it("should create mention data excluding current user", () => {
      const result = createMentionData(mockPeers, "1");

      expect(result).toHaveLength(2); // 1 peer + 1 bot
      expect(result[0]).toEqual({
        userId: "2",
        displayName: "JaneSmith",
        startIndex: 0,
        endIndex: 0,
      });
      expect(result[1]).toEqual({
        userId: "generationBot",
        displayName: "생성봇",
        startIndex: 0,
        endIndex: 0,
      });
    });

    it("should include all peers when current user is not in the list", () => {
      const result = createMentionData(mockPeers, "3");

      expect(result).toHaveLength(3); // 2 peers + 1 bot
      expect(result[0].userId).toBe("1");
      expect(result[1].userId).toBe("2");
      expect(result[2].userId).toBe("generationBot");
    });

    it("should handle empty peers array", () => {
      const result = createMentionData([], "1");

      expect(result).toHaveLength(1); // Only bot
      expect(result[0]).toEqual({
        userId: "generationBot",
        displayName: "생성봇",
        startIndex: 0,
        endIndex: 0,
      });
    });
  });
});
