function FocusTaskItem({ task, onComplete }) {
  return (
    <li className="flex items-center justify-between gap-4 py-4 px-2">
      <div className="flex-1">
        <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-slate-100 break-words">
          {task.text}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onComplete(task.id)}
        className="shrink-0 rounded-md border border-green-300 hover:border-green-400 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-600 hover:text-green-700 dark:text-green-300 dark:hover:text-green-200 dark:border-green-600 px-3 py-2 text-sm font-semibold"
        aria-label={`Mark as complete: ${task.text}`}
      >
        ✓
      </button>
    </li>
  );
}

export default FocusTaskItem;
