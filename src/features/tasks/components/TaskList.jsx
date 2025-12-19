function TaskItem({ task, onDelete }) {
  return (
    <li className="flex items-start justify-between gap-3 py-2">
      <div className="flex-1">
        <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-slate-100 break-words">
          {task.text}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="shrink-0 rounded-md border border-red-300 hover:border-red-400 text-red-600 hover:text-red-700 dark:text-red-300 dark:hover:text-red-200 dark:border-red-500 px-2 py-1 text-xs"
        aria-label={`Delete task: ${task.text}`}
      >
        Delete
      </button>
    </li>
  );
}

export default function TaskList({ tasks, deleteTask }) {
  return (
    <section className="rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-4 sm:p-6 shadow-sm">
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-slate-400">
          No tasks yet. Add your first task to get started!
        </p>
      ) : (
        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
          {tasks.map((t) => (
            <TaskItem key={t.id} task={t} onDelete={deleteTask} />
          ))}
        </ul>
      )}
    </section>
  );
}
