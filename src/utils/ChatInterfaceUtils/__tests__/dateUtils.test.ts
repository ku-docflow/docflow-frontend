import { formatTimestamp } from "../dateUtils";

describe("dateUtils", () => {
  describe("formatTimestamp", () => {
    it("should format timestamp correctly in Korean locale", () => {
      const timestamp = "2024-03-15T14:30:00Z";
      const formatted = formatTimestamp(timestamp);

      // The expected format should be like: '2024. 03. 15. 오후 02:30'
      expect(formatted).toMatch(
        /^\d{4}\. \d{2}\. \d{2}\. (오전|오후) \d{2}:\d{2}$/
      );
    });

    it("should handle different timezones correctly", () => {
      const timestamp = "2024-03-15T00:00:00Z";
      const formatted = formatTimestamp(timestamp);

      // Should still be in the correct format regardless of timezone
      expect(formatted).toMatch(
        /^\d{4}\. \d{2}\. \d{2}\. (오전|오후) \d{2}:\d{2}$/
      );
    });

    it("should handle invalid timestamp gracefully", () => {
      const timestamp = "invalid-date";
      const formatted = formatTimestamp(timestamp);

      // Should return 'Invalid Date' formatted string
      expect(formatted).toBe("Invalid Date");
    });
  });
});
