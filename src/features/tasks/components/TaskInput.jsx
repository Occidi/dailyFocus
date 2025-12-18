import { useState } from "react";

export default function TaskInput({ addTask }) {
  const [text, setText] = useState("");
  const trimmed = text.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trimmed) return;
    addTask(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 sm:mb-6">
      <label className="sr-only" htmlFor="task-input">
        Add a task
      </label>
      <div className="flex gap-2">
        <input
          id="task-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/60 text-gray-900 dark:text-slate-100 placeholder:text-slate-400 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Task text"
        />
        <button
          type="submit"
          disabled={!trimmed}
          className="rounded-md px-3 sm:px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Add task"
          title="Add task"
        >
          +
        </button>
      </div>
    </form>
  );
}
