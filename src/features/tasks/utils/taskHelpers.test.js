import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createTask, removeTaskById, addTaskToList } from "./taskHelpers";

describe("createTask", () => {
  beforeEach(() => {
    vi.stubGlobal("Date", { now: vi.fn(() => 123) });
    vi.stubGlobal("crypto", { randomUUID: vi.fn(() => "testUUID") });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("creates an object with an id string, a trimmed text string and a timestamp number", () => {
    expect(createTask("My First Task  ")).toEqual({
      id: "testUUID",
      text: "My First Task",
      createdAt: 123,
    });
  });

  it("returns null for an empty string input", () => {
    expect(createTask("")).toBe(null);
  });

  it("returns null for a whitespace-only string input", () => {
    expect(createTask("   ")).toBe(null);
  });
});

describe("removeTaskById", () => {
  const tasks = [
    { id: "1", text: "Task 1", createdAt: 123 },
    { id: "2", text: "Task 2", createdAt: 123 },
    { id: "3", text: "Task 3", createdAt: 123 },
  ];

  it("removes task with matching id", () => {
    const result = removeTaskById(tasks, "2");

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: "1", text: "Task 1", createdAt: 123 },
      { id: "3", text: "Task 3", createdAt: 123 },
    ]);
  });

  it("returns unchanged array when id not found", () => {
    const result = removeTaskById(tasks, "wrongId");

    expect(result).toHaveLength(3);
    expect(result).toEqual(tasks);
  });

  it("returns an empty array when no tasks are present", () => {
    const result = removeTaskById([], "1");

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});

describe("addTaskToList", () => {
  const tasks = [
    { id: "1", text: "Task 1", createdAt: 123 },
    { id: "2", text: "Task 2", createdAt: 123 },
  ];

  it("adds task to the end of the list", () => {
    const newTask = { id: "3", text: "Task 3", createdAt: 123 };
    const result = addTaskToList(tasks, newTask);

    expect(result).toHaveLength(3);
    expect(result[2]).toEqual(newTask);
  });

  it.each([
    { wrongEntry: true },
    { wrongEntry: "" },
    { wrongEntry: null },
    { wrongEntry: undefined },
  ])("returns null if the first param is $wrongEntry", ({ wrongEntry }) => {
    const newTask = { id: "1", text: "First task", createdAt: 123 };
    expect(() => addTaskToList(wrongEntry, newTask)).toThrow;
  });

  it.each([
    { wrongEntry: true },
    { wrongEntry: "" },
    { wrongEntry: null },
    { wrongEntry: undefined },
  ])("returns null if the second param is $wrongEntry", ({ wrongEntry }) => {
    expect(() => addTaskToList(tasks, wrongEntry)).toThrow;
  });

  it("adds task to empty array or when not provided with a first param", () => {
    const newTask = { id: "1", text: "First task", createdAt: 123 };
    const result = addTaskToList([], newTask);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(newTask);

    expect(addTaskToList(undefined, newTask)).toHaveLength(1);
    expect(addTaskToList(undefined, newTask)[0]).toEqual(newTask);
  });
});
