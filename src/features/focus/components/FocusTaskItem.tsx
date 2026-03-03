import type { Task } from "../../tasks/utils/taskHelpers";

export default function FocusTaskItem({
  task,
  onComplete,
}: {
  task: Task;
  onComplete: (taskId: string) => void;
}) {
  return (
    <li className="flex items-center justify-between gap-4 py-4 px-2">
      <div className="flex-1">
        <p className="text-lg sm:text-xl font-semibold text-gray-900 text-slate-100 break-words">
          {task.text}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onComplete(task.id)}
        className="shrink-0 rounded-md border hover:border-green-400 bg-green-900/20 hover:bg-green-900/40 text-green-300 hover:text-green-200 border-green-600 px-3 py-2 text-sm font-semibold"
        aria-label={`Mark as complete: ${task.text}`}
      >
        ✓
      </button>
    </li>
  );
}
