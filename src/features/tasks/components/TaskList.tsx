import type { Task } from "../utils/taskHelpers";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  onAddToFocus: (taskId: string) => void;
  canAddToFocus: boolean;
};

function TaskItem({
  task,
  onDelete,
  onAddToFocus,
  canAddToFocus,
}: TaskItemProps) {
  return (
    <li className="flex items-start justify-between gap-3 py-2">
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="shrink-0 rounded-md border hover:border-red-400  text-red-300 hover:text-red-200 border-red-500 px-2 py-1 text-xs"
        aria-label={`Delete task: ${task.text}`}
      >
        -
      </button>
      <div className="flex-1">
        <p className="text-sm sm:text-base font-medium text-gray-900 text-slate-100 break-words">
          {task.text}
        </p>
      </div>
      {canAddToFocus && (
        <button
          type="button"
          onClick={() => onAddToFocus(task.id)}
          className="shrink-0 rounded-md border hover:border-green-400 text-green-300 hover:text-green-200 border-green-500 px-2 py-1 text-xs"
          aria-label={`Add to focus: ${task.text}`}
        >
          +
        </button>
      )}
    </li>
  );
}

type TaskListProps = {
  tasks: Task[];
  deleteTask: (id: string) => void;
  onAddToFocus: (taskId: string) => void;
  canAddToFocus: boolean;
};

export default function TaskList({
  tasks,
  deleteTask,
  onAddToFocus,
  canAddToFocus,
}: TaskListProps) {
  return (
    <section className="rounded-lg bg-white bg-slate-900/60 border border-slate-700 p-4 sm:p-6 shadow-sm">
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600 text-slate-400">
          No tasks yet. Add your first task to get started!
        </p>
      ) : (
        <ul className="divide-y divide-slate-700">
          {tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onDelete={deleteTask}
              onAddToFocus={onAddToFocus}
              canAddToFocus={canAddToFocus}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
