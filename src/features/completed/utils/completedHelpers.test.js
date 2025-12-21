import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { formatRelativeTime } from "./completedHelpers";

describe("formatRelativeTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(1000000);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'just now' for timestamps within 1 minute", () => {
    const recentTimestamp = 1000000 - 30000; // 30 seconds ago
    expect(formatRelativeTime(recentTimestamp)).toBe("just now");
  });

  it("returns minutes ago for timestamps within 1 hour", () => {
    const timestamp = 1000000 - 300000; // 5 minutes ago
    expect(formatRelativeTime(timestamp)).toBe("5 minutes ago");
  });

  it("returns singular minute ago when 1 minute has passed", () => {
    const timestamp = 1000000 - 60000; // 1 minute ago
    expect(formatRelativeTime(timestamp)).toBe("1 minute ago");
  });

  it("returns hours ago for timestamps within 1 day", () => {
    const timestamp = 1000000 - 7200000; // 2 hours ago
    expect(formatRelativeTime(timestamp)).toBe("2 hours ago");
  });

  it("returns singular hour ago when 1 hour has passed", () => {
    const timestamp = 1000000 - 3600000; // 1 hour ago
    expect(formatRelativeTime(timestamp)).toBe("1 hour ago");
  });

  it("returns days ago for timestamps within 1 week", () => {
    const timestamp = 1000000 - 172800000; // 2 days ago
    expect(formatRelativeTime(timestamp)).toBe("2 days ago");
  });

  it("returns singular day ago when 1 day has passed", () => {
    const timestamp = 1000000 - 86400000; // 1 day ago
    expect(formatRelativeTime(timestamp)).toBe("1 day ago");
  });

  it("returns formatted date for timestamps older than 1 week", () => {
    const timestamp = 1000000 - 691200000; // 8 days ago
    const result = formatRelativeTime(timestamp);
    // Should return a date string
    expect(result).not.toContain("ago");
    expect(result.length).toBeGreaterThan(0);
  });
});
