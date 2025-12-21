import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  createTask,
  removeTaskById,
  addTaskToList,
  findTaskById,
  moveTaskBetweenLists,
  addCompletionTimestamp,
} from "./taskHelpers";

describe("createTask", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(123);
    vi.stubGlobal("crypto", { randomUUID: vi.fn(() => "testUUID") });
  });

  afterEach(() => {
    vi.useRealTimers();
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

describe("findTaskById", () => {
  const tasks = [
    { id: "1", text: "Task 1", createdAt: 123 },
    { id: "2", text: "Task 2", createdAt: 123 },
    { id: "3", text: "Task 3", createdAt: 123 },
  ];

  it("finds and returns task with matching id", () => {
    const result = findTaskById(tasks, "2");

    expect(result).toEqual({ id: "2", text: "Task 2", createdAt: 123 });
  });

  it("returns undefined when task id not found", () => {
    const result = findTaskById(tasks, "wrongId");

    expect(result).toBeUndefined();
  });

  it("returns undefined when searching empty array", () => {
    const result = findTaskById([], "1");

    expect(result).toBeUndefined();
  });
});

describe("moveTaskBetweenLists", () => {
  const fromList = [
    { id: "1", text: "Task 1", createdAt: 123 },
    { id: "2", text: "Task 2", createdAt: 123 },
    { id: "3", text: "Task 3", createdAt: 123 },
  ];
  const toList = [{ id: "4", text: "Task 4", createdAt: 123 }];

  it("moves task from one list to another", () => {
    const result = moveTaskBetweenLists(fromList, toList, "2");

    expect(result.fromList).toHaveLength(2);
    expect(result.fromList).toEqual([
      { id: "1", text: "Task 1", createdAt: 123 },
      { id: "3", text: "Task 3", createdAt: 123 },
    ]);

    expect(result.toList).toHaveLength(2);
    expect(result.toList[1]).toEqual({
      id: "2",
      text: "Task 2",
      createdAt: 123,
    });
  });

  it("respects maxSize constraint and returns null if destination is full", () => {
    const smallToList = [
      { id: "4", text: "Task 4", createdAt: 123 },
      { id: "5", text: "Task 5", createdAt: 123 },
    ];

    const result = moveTaskBetweenLists(fromList, smallToList, "2", 2);

    expect(result).toBeNull();
  });

  it("returns null if task id not found in source list", () => {
    const result = moveTaskBetweenLists(fromList, toList, "wrongId");

    expect(result).toBeNull();
  });

  it("returns null when source list is empty", () => {
    const result = moveTaskBetweenLists([], toList, "1");

    expect(result).toBeNull();
  });

  it("moves task to empty destination list", () => {
    const result = moveTaskBetweenLists(fromList, [], "2");

    expect(result.fromList).toHaveLength(2);
    expect(result.toList).toHaveLength(1);
    expect(result.toList[0]).toEqual({
      id: "2",
      text: "Task 2",
      createdAt: 123,
    });
  });
});

describe("addCompletionTimestamp", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(456);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("adds completedAt timestamp to task", () => {
    const task = { id: "1", text: "Task 1", createdAt: 123 };
    const result = addCompletionTimestamp(task);

    expect(result).toEqual({
      id: "1",
      text: "Task 1",
      createdAt: 123,
      completedAt: 456,
    });
  });

  it("returns null if task is null or undefined", () => {
    expect(addCompletionTimestamp(null)).toBeNull();
    expect(addCompletionTimestamp(undefined)).toBeNull();
  });

  it("preserves all original task properties", () => {
    const task = {
      id: "2",
      text: "Complex Task",
      createdAt: 100,
      customProp: "value",
    };
    const result = addCompletionTimestamp(task);

    expect(result).toEqual({
      id: "2",
      text: "Complex Task",
      createdAt: 100,
      customProp: "value",
      completedAt: 456,
    });
  });
});
